const {app} = require('electron');

const dataFolder = app.getPath('userData') + '/v3';
const mediaFolder = app.getPath('documents') + '/v3-media';

module.exports = {
  mediaFolder,
  dataFolder
};
