const {ipcMain} = require('electron');
const fetchUser = require('../../lib/fetch-user');
const chatBotCreator = require('../../lib/chat-bot-creator');
let user;

ipcMain.on('connectToChat', (event, jwt) => {
  console.log('connecting to chat\n', e);
  fetchUser(jwt).then(response => {
    user = response.data;
    user.jwt = jwt;
  }).catch(e => {
    console.log('error connecting to chat\n', e);
  }).finally(() => {
    if (user) {
      chatBotCreator.createBotFor(user);
    }
  });
});
