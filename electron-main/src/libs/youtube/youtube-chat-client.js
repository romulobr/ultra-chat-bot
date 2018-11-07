const youtubeClient = require('./youtube-client');

function requestChatMessages(oauth2Client, liveChatId, pageToken) {
  return youtubeClient.getLiveChatMessages(oauth2Client, liveChatId, pageToken);
}

function create(user, apps, liveChatId) {
  let firstFetch = false;
  let isRunning = true;
  let pageToken = null;

  let youtubeOauthClient = youtubeClient.oAuthClientWith(user.accessToken, user.refreshToken);
  const channelName = user.displayName;

  function stop() {
    isRunning = false;
  }

  function handleResponse(response) {
    pageToken = response.nextPageToken;
    response.messages.forEach(message => {
      apps.forEach(app => {
        app.handleMessage(message);
      });
    });
  }

  if (youtubeOauthClient) {
    youtubeClient
      .sendChatMessage(
        youtubeOauthClient,
        liveChatId,
        '🐮v3 on!',
      )
      .then(
        r => console.log(JSON.stringify(r)),
        e => console.log(JSON.stringify(e))
      );
    requestChatMessages(youtubeOauthClient, liveChatId, pageToken).then(
      response => {
        pageToken = response.nextPageToken;
        setTimeout(fetch, response.pollingIntervalMillis || 5000);
      }
    );
  }

  function fetch() {
    if (!isRunning) {
      console.log('Not fetching, bot is not running: ' + channelName);
      return;
    }
    requestChatMessages(youtubeOauthClient, liveChatId, pageToken).then(
      response => {
        if (firstFetch) {
          firstFetch = false
        } else {
          handleResponse(response);
        }
        pageToken = response.nextPageToken;
        setTimeout(fetch, response.pollingIntervalMillis || 5000);
      },
      err => {
        if (err.reason !== 'liveChatEnded' && err.reason !== 'liveChatNotFound') {
          console.log(
            'unexpected error fetching messages:' + JSON.stringify(err)
          );
          setTimeout(fetch, 30000);
        }
      }
    );
  }

  return stop;
}

module.exports = {
  create
};
