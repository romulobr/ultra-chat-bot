const urls = require('../../urls');
const MediaPlayerApp = require('../chat-apps/media-player/media-player-chat-app');
const ChickenApp = require('../chat-apps/chiken/chicken-chat-app');
const IconsApp = require('../chat-apps/icons/icons-chat-app');
const WelcomeApp = require('../chat-apps/welcome/welcome-chat-app');
const NewsApp = require('../chat-apps/news/news-chat-app');
const LoyaltyApp = require('../chat-apps/loyalty/loyalty-chat-app');

const twitchChatClient = require('../twitch/twitch-chat-client');
const youtubeChatClient = require('../youtube/youtube-chat-client');

const validateTwitchUserTokenAndRefreshIfNeeded = require('../twitch/validate-twitch-user-tokens-and-refresh-if-needed');
const chatAppCreator = require('./chat-app-creator');

const createLoyaltySystem = require('./loyalty/loyalty-system-creator');
let loyaltySystem;

async function createChatBotApps(user) {
  const apps = [];

  try {
    loyaltySystem = await createLoyaltySystem(user);
  } catch (e) {
    console.log('failed to create loyalty system', e);
  }

  async function createApp(app, url, name) {
    try {
      const newApp = await chatAppCreator(user, app, url, loyaltySystem);
      apps.push(newApp);
    } catch (e) {
      console.log(`failed to create app: ${name},`, e);
    }
  }

  await createApp(LoyaltyApp, urls.loyaltyApi, 'loyalty');
  await createApp(MediaPlayerApp, urls.mediaApi, 'media player');
  await createApp(ChickenApp, urls.chickenApi, 'chicken');
  await createApp(IconsApp, urls.iconsApi, 'icons');
  await createApp(WelcomeApp, urls.welcomeApi, 'welcome');
  await createApp(NewsApp, urls.newsApi, 'news');

  return (apps);
}

function createBotFor(user, options) {
  return new Promise((success, fail) => {
    if (user.origin === 'twitch') {
      createChatBotApps(user).then(apps => {
        validateTwitchUserTokenAndRefreshIfNeeded(user).then(user => {
          success(twitchChatClient.create(user, apps, loyaltySystem));
        }).catch(e => {
          console.log(e);
          fail(e);
        });
      })
    } else if (user.origin === 'youtube') {
      createChatBotApps(user).then(apps => {
        success(youtubeChatClient.create(user, apps, options.liveChatId, loyaltySystem));
      }).catch(e => {
        console.log(e);
        fail(e);
      });
    }
  });
}

module.exports = {createBotFor};
