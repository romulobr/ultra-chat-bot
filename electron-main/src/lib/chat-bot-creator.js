const twitchChatClient = require('./twitch/twitch-chat-client');
const youtubeChatClient = require('./youtube/youtube-chat-client');

const validateTwitchUserTokenAndRefreshIfNeeded = require('./twitch/validate-twitch-user-tokens-and-refresh-if-needed');

const createMediaPlayerChatApp = require('./chat-apps/media-player/media-player-chat-app-creator');

function createChatBotApps(user) {
  const apps = [];
  return new Promise(success => {
    createMediaPlayerChatApp(user).then(chatApp => {
      apps.push(chatApp);
    }).catch(e => {
      console.log('could not create chat apps', e)
    }).finally(() => {
      success(apps);
    });
  });
}

function createBotFor(user, options) {
  return new Promise((success, fail) => {
    if (user.origin === 'twitch') {
      createChatBotApps(user).then(apps => {
        validateTwitchUserTokenAndRefreshIfNeeded(user).then(user => {
          success(twitchChatClient.create(user, apps));
        }).catch(e => {
          console.log(e);
          fail(e);
        });
      })
    } else if (user.origin === 'youtube') {
      createChatBotApps(user, options.liveChatId).then(apps => {
        success(youtubeChatClient.create(user, apps));
      })
    }
  });
}

module.exports = {createBotFor};
