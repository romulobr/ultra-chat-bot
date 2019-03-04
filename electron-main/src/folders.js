const {app} = require('electron');

const dataFolder = app.getPath('documents') + '/v3';
const mediaFolder = app.getPath('documents') + '/v3-media';

module.exports = {
  mediaFolder,
  dataFolder
};
