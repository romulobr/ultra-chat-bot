const {ipcMain} = require('electron');
const fetchUser = require('..//fetch-user');
const chatBotCreator = require('..//chat-bot-creator');
let user;

let stopChatBot;

ipcMain.on('connectToChat', (event, jwt, options) => {
  console.log('connecting to chat\n');
  fetchUser(jwt).then(response => {
    user = response.data;
    user.jwt = jwt;
    chatBotCreator.createBotFor(user, options).then(bot=>{
      stopChatBot = bot;
    });
    event.sender.send('connectedToChat')
  }).catch(e => {
    console.log('error connecting to chat\n', e);
    event.sender.send('connectToChatFailed')
  });
});

ipcMain.on('disconnectFromChat', (event) => {
  if (stopChatBot) {
    stopChatBot();
    event.sender.send('disconnectedFromChat')
  }
});
