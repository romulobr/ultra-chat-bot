const hooks = require('./loyalty-points-service-hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const dataFolder = require('../../../folders').dataFolder;

const Model = new NeDB({
  filename: dataFolder + '/loyalty-points.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/loyalty-points', service({Model}));
  app.service('/loyalty-points').hooks(hooks);
};
