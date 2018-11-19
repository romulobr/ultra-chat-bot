const twitchChatClient = require('./twitch/twitch-chat-client');
const youtubeChatClient = require('./youtube/youtube-chat-client');

const validateTwitchUserTokenAndRefreshIfNeeded = require('./twitch/validate-twitch-user-tokens-and-refresh-if-needed');

const createMediaPlayerChatApp = require('./chat-apps/media-player/media-player-chat-app-creator');
const createChickenChatApp = require('./chat-apps/chiken/chicken-app-chat-app-creator');
const createEmotionsChatApp = require('./chat-apps/emotions/emotions-chat-app-creator');

async function createChatBotApps(user) {
  const apps = [];
  try {
    const mediaChatApp = await createMediaPlayerChatApp(user);
    apps.push(mediaChatApp);
  } catch (e) {
    console.log('failed to create media chat app')
  }
  try {
    const chickenChatApp = await createChickenChatApp(user);
    apps.push(chickenChatApp);
  } catch (e) {
    console.log('failed to create chicken chat app')
  }
  try {
    const emotionsApp = await createEmotionsChatApp(user);
    apps.push(emotionsApp);
  } catch (e) {
    console.log('failed to create emotions chat app')
  }
  return (apps);
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
      createChatBotApps(user).then(apps => {
        success(youtubeChatClient.create(user, apps, options.liveChatId));
      }).catch(e => {
        console.log(e);
        fail(e);
      });
    }
  });
}

module.exports = {createBotFor};
