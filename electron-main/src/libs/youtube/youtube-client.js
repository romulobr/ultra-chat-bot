'use strict';
const {google} = require('googleapis'),
  OAuth2Client = google.auth.OAuth2,
  youtube = google.youtube('v3'),
  youtubeCredentials = require('./youtube-credentials'),
  toNormalizedMessage = require('./youtube-chat-message-normalizer');

//const apiKey = require('./youtube-credentials').apiKey;

function credentialsWith(accessToken, refreshToken) {
  return {
    'access_token': accessToken,
    'refresh_token': refreshToken
  };
}

function oAuthClientWith(accessToken, refreshToken) {
  const oauth2Client = new OAuth2Client(youtubeCredentials.clientId, youtubeCredentials.clientSecret, youtubeCredentials.redirectUrl);
  oauth2Client.setCredentials(credentialsWith(accessToken, refreshToken));
  return oauth2Client;
}

const getBroadcasts = (oauth2Client) => {
  //  console.log('api call: getBroadcasts');
  const persistentBroadcasts = new Promise((fulfill, reject) => {
    youtube.liveBroadcasts.list({
      auth: oauth2Client,
      maxResults: 5,
      broadcastType: 'persistent',
      part: 'snippet,status',
      mine: 'true'
    }, function (err, results) {
      if (err) {
        console.log('error fetching live streams', err);
        reject(err);
      } else {
        fulfill(results.data.items);
      }
    });
  });

  const eventBroadcasts = new Promise((fulfill, reject) => {
    youtube.liveBroadcasts.list({
      auth: oauth2Client,
      maxResults: 5,
      broadcastType: 'event',
      part: 'snippet,status',
      mine: 'true'
    }, function (err, results) {
      if (err) {
        console.log('error fetching live streams', err);
        reject(err);
      } else {
        fulfill(results.data.items);
      }
    });
  });
  return new Promise((fulfill, reject) => {
    Promise.all([persistentBroadcasts, eventBroadcasts]).then(values => {
      fulfill(values[0].concat(values[1]).filter(broadcast=>broadcast.status.lifeCycleStatus!=='complete'));
    }, error => {
      logger.error('error fetching live broadcasts' + JSON.stringify(error));
      reject(error);
    });
  });
};

const getBroadcastsByIds = (oauth2Client, streamIds) => {
  //  console.log('api call: getBroadcasts');
  return new Promise((fulfill, reject) => {
    youtube.liveBroadcasts.list({
      auth: oauth2Client,
      maxResults: 5,
      broadcastType: 'all',
      part: 'snippet,status',
      id: streamIds
    }, function (err, results) {
      if (err) {
        console.log('error fetching live streams', err);
        reject(err);
      } else {
        fulfill(results.items);
      }
    });
  });
};

const getBroadcastsAndOAuthClientsFromCredentials = (credential) => {
  //  console.log('api call: getBroadcasts');
  //oAuthClientWith()
  const accessToken = credential.credentials.access;
  const refreshToken = credential.credentials.refresh;
  const oAuthClient = oAuthClientWith(accessToken, refreshToken);
  return {
    oAuthClient,
    broadcasts: getBroadcasts(oAuthClient)
  };
};

function getLiveChatMessages(oauth2Client, liveChatId, pageToken) {
  //  console.log('api call: getChatMessages');
  return new Promise(function (fulfill, reject) {
    const data = {
      auth: oauth2Client,
      liveChatId: liveChatId,
      part: 'snippet,authorDetails',
      maxResults: 2000
    };
    if (pageToken) {
      data.pageToken = pageToken;
    }
    return youtube.liveChatMessages.list(data, function (err, messages) {
      if (err) {
        console.log('error fetching chat messages', err);
        reject(err);
      } else {
        if (messages.data.items.length > 0) {
          fulfill({
            pollingIntervalMillis: messages.data.pollingIntervalMillis,
            nextPageToken: messages.data.nextPageToken,
            messages: messages.data.items.map(toNormalizedMessage)
          });
        } else {
          fulfill({
            pollingIntervalMillis: messages.data.pollingIntervalMillis,
            nextPageToken: messages.data.nextPageToken,
            messages: []
          });
        }
      }
    });
  });
}

function silenceUser(oauth2Client, liveChatId, channelId, seconds) {
  //console.log('api call: silenceUser');
  return new Promise((fulfill, reject) => {
    const data = {
      auth: oauth2Client,
      part: 'snippet',
      userId: 'me',
      resource: {
        kind: 'youtube#liveChatBan',
        snippet: {
          liveChatId: liveChatId,
          type: 'temporary',
          bannedUserDetails: {
            channelId: channelId
          },
          banDurationSeconds: seconds,
        },
      }
    };
    youtube.liveChatBans.insert(data, function (err, ban) {
      if (err) {
        console.log('error silencing user', err);
        reject(err);
      } else {
        fulfill(ban);
      }
    });
  });
}

function sendChatMessage(oauth2Client, liveChatId, text) {
  //console.log('api call: sendChatMessage');
  return new Promise((fulfill, reject) => {
    const data = {
      auth: oauth2Client,
      resource: {
        snippet: {
          liveChatId: liveChatId,
          type: 'textMessageEvent',
          textMessageDetails: {
            messageText: text
          },
        },
      },
      userId: 'me',
      part: 'snippet'
    };
    youtube.liveChatMessages.insert(data, function (err, message) {
      if (err) {
        console.log('error sending chat message', err);
        reject(err);
      } else {
        fulfill(message);
      }
    });
  });
}

function getLikes(oauth2Client, broadcastId) {
  const data = {
    auth: oauth2Client,
    id: broadcastId,
    part: 'statistics'
  };

  return new Promise((fullfill, reject) => {
    youtube.videos.list(data, (err, message) => {
      if (err) {
        logger.error('error getting likes ' + JSON.stringify(err));
        reject(err);
      } else {
        try {
          fullfill(message.items[0].statistics.likeCount);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

var fakeLikes = 0;

function getFakeLikes() {
  fakeLikes++;
  if (fakeLikes > 150) {
    fakeLikes = 0;
  }
  return Promise.resolve(fakeLikes);
}

module.exports = {
  oAuthClientWith,
  getBroadcasts,
  getLiveChatMessages,
  silenceUser,
  sendChatMessage,
  getBroadcastsByIds,
  getLikes,
  getFakeLikes,
  getBroadcastsAndOAuthClientsFromCredentials
};
