const hooks = require('./welcome-messages-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/welcome-messages.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/welcome-messages', service({Model}));
  app.service('/welcome-messages').hooks(hooks);
};
