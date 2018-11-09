const hooks = require('./stream-labs-token.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');


const Model = new NeDB({
  filename: './data/stream-labs-token.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/stream-labs-token', service({Model}));
  app.service('/stream-labs-token').hooks(hooks);
};
