const hooks = require('./stream-labs.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');


const Model = new NeDB({
  filename: './data/stream-labs.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/streamlabs', service({Model}));
  app.service('/streamlabs').hooks(hooks);
};
