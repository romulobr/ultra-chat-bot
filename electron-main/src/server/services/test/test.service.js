const hooks = require('../jwt-auth-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;
console.log(dataFolder);
const Model = new NeDB({
  filename: dataFolder + '/test.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/test', service({Model}));
  app.service('/test').hooks(hooks);
};
