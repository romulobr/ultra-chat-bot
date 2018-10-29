const {ipcMain} = require('electron');
const {shell} = require('electron');
const {app} = require('electron');
const mediaImporter = require('./media-importer');
const fs = require('fs');

const mediaFolder = app.getPath('documents') + '/v3-media';

function createMediaFolder() {
    if (!fs.existsSync(mediaFolder)) {
        fs.mkdirSync(mediaFolder);
    }
}

ipcMain.on('openMediaFolder', (event, arg) => {
    console.log('\n\n\nopening media folder\n\n\n');
    createMediaFolder();
    shell.openItem(mediaFolder);
});

ipcMain.on('importMedia', (event, arg) => {
    console.log('\n\n\nimporting media\n\n\n');
    createMediaFolder();
    mediaImporter(event.sender.getOwnerBrowserWindow());
});
