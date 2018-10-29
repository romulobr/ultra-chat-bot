const {ipcMain} = require('electron');
const fetchUser = require('../../lib/fetch-user');
const chatBotCreator = require('../../lib/chat-bot-creator');
let user;

ipcMain.on('connectToChat', (event, arg) => {
    fetchUser(arg).then(response => {
        user = response.data;
    }).catch(e => {
        console.log('error connecting to chat\n', e);
    }).finally(() => {
        if (user) {
            chatBotCreator(user);
        }
    });
});

