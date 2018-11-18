const hooks = require('../jwt-auth-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/stream-elements-token.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/stream-elements-token', service({Model}));
  app.service('/stream-elements-token').hooks(hooks);
}
