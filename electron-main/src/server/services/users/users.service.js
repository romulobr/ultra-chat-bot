const hooks = require('./users.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/users.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/users', service({Model}));
  app.service('/users').hooks(hooks);
};
