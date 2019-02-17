const youtubeClient = require('./youtube-client');

function requestChatMessages(oauth2Client, liveChatId, pageToken) {
  return youtubeClient.getLiveChatMessages(oauth2Client, liveChatId, pageToken);
}

function create(user, apps, liveChatId, loyaltySystem) {
  let firstFetch = false;
  let isRunning = true;
  let pageToken = null;

  let youtubeOauthClient = youtubeClient.oAuthClientWith(user.accessToken, user.refreshToken);
  youtubeOauthClient.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });
  const channelName = user.displayName;

  function say(message) {
    youtubeClient
      .sendChatMessage(
        youtubeOauthClient,
        liveChatId,
        message,
      )
  }

  apps.forEach(app => {
    app.say = say;
  });

  function stop() {
    loyaltySystem.stop();
    apps.forEach(app => {
      app.stop && app.stop();
    });
    youtubeClient
      .sendChatMessage(
        youtubeOauthClient,
        liveChatId,
        '🐮🛑💬',
      )
      .then(
        r => console.log(JSON.stringify(r)),
        e => console.log(JSON.stringify(e))
      );
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
        '🐮🔌💬',
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
