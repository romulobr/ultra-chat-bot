const {app} = require('electron');
const fs = require('fs');

const mediaFolder = app.getPath('documents') + '/v3-media';

function importFromMediaFolder(window) {
    const mediaFiles = fs.readdirSync(mediaFolder).filter(file => /(.*)+(.mp4|.mp3|.ogg|.webm|.mov|.mpeg|.wav|.aac)$/.test(file))
        .map(item => ({
            command: item.split('.')[0],
            url: item
        }));
    window.webContents.send('mediaImported', mediaFiles);
}

module.exports = importFromMediaFolder;
