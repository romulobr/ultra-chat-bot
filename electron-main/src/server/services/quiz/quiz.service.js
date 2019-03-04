const hooks = require('../jwt-auth-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;
console.log(dataFolder);
const Model = new NeDB({
  filename: dataFolder + '/quiz.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/quiz', service({Model}));
  app.service('/quiz').hooks(hooks);
};
