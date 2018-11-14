const hooks = require('./chicken.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/chicken.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/chicken', service({Model}));
  app.service('/chicken').hooks(hooks);
};
