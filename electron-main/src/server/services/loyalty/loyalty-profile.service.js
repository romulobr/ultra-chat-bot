const hooks = require('./loyalty-profile-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/loyalty-profile.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/loyalty-profile', service({Model}));
  app.service('/loyalty-profile').hooks(hooks);
};
