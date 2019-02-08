const hooks = require('../jwt-auth-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/loyalty.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/loyalty', service({Model}));
  app.service('/loyalty').hooks(hooks);
};
