const hooks = require('../jwt-auth-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/media.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/media', service({Model}));
  app.service('/media').hooks(hooks);
};
