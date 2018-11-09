const hooks = require('./chicken.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');

const Model = new NeDB({
  filename: './data/chicken.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/chicken', service({Model}));
  app.service('/chicken').hooks(hooks);
};
