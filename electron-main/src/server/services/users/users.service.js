const hooks = require('./users.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;
console.log('\n\n\n\n\ndatafolder:',dataFolder,'\n\n\n\n\n\n\n');
const Model = new NeDB({
  filename: dataFolder + '/users.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/users', service({Model}));

  app.service('/users').hooks(hooks);
}
