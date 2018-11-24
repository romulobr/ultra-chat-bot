const {ipcMain} = require('electron');
const {shell} = require('electron');
const mediaImporter = require('./media-importer');
const fs = require('fs');

const mediaFolder = require('../../folders').mediaFolder;

function createMediaFolder() {
  if (!fs.existsSync(mediaFolder)) {
    fs.mkdirSync(mediaFolder);
  }
}

ipcMain.on('openMediaFolder', () => {
  createMediaFolder();
  shell.openItem(mediaFolder);
});

ipcMain.on('importMedia', (event) => {
  console.log('importing media data');
  createMediaFolder();
  mediaImporter(event.sender.getOwnerBrowserWindow());
});
