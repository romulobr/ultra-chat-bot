const {ipcMain} = require('electron');
const fetchUser = require('..//fetch-user');
const chatBotCreator = require('..//chat-bot-creator');
let user;

let stopTwitchChatBot;
let stopYoutubeChatBot = {};

ipcMain.on('connectToChat', (event, jwt, options) => {
  console.log('connecting to chat\n');
  fetchUser(jwt).then(response => {
    user = response.data;
    user.youtube && (user.youtube.jwt = jwt);
    user.twitch && (user.twitch.jwt = jwt);
    if (options.youtube) {
      chatBotCreator.createBotFor(user.youtube, {liveChatId: options.youtube.liveChatId}).then(bot => {
        stopYoutubeChatBot[options.youtube.liveChatId] = bot;
      });
      event.sender.send('connectedToChat', {origin: 'youtube', liveChatId: options.youtube.liveChatId});
    } else {
      chatBotCreator.createBotFor(user.twitch).then(bot => {
        stopTwitchChatBot = bot;
      });
      event.sender.send('connectedToChat', {origin: 'twitch'});
    }

  }).catch(e => {
    console.log('error connecting to chat\n', e);
    event.sender.send('connectToChatFailed', options)
  });
});

ipcMain.on('disconnectFromChat', (event, options) => {
  if (options.twitch) {
    stopTwitchChatBot && stopTwitchChatBot();
    event.sender.send('disconnectedFromChat', {origin: 'twitch'});
  }
  else if (options.youtube) {
    stopYoutubeChatBot[options.youtube.liveChatId] && stopYoutubeChatBot[options.youtube.liveChatId]();
    event.sender.send('disconnectedFromChat', {origin: 'youtube', liveChatId: options.youtube.liveChatId});
  }
});
