const {ipcMain} = require('electron');
const {session} = require('electron');

ipcMain.on('deauthenticate', () => {
  session.defaultSession.clearStorageData([], function (data) {
  });
});

ipcMain.on('disconnectStreamlabs', () => {
  session.defaultSession.clearStorageData({origin: 'https://streamlabs.com'}, function (data) {
    console.log(data);
  });
});
