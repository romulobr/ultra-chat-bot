const fs = require('fs');
const dataFolder = require('../../folders').dataFolder;

function readSettingsFile(name) {
  const filePath = `${dataFolder}/${name}.json`;
  console.log('settings read from ' + filePath);
  try {
    return JSON.parse(fs.readFileSync(filePath));
  }catch(e){
    return {};
  }
}

function initialize(app) {
  app.get('/settings-file/:name', function (req, res) {
    res.send(readSettingsFile(req.params.name));
  });
}

module.exports = {initialize};
