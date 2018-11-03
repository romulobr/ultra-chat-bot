const hooks = require('./stream-elements-token.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');


const Model = new NeDB({
  filename: './data/stream-elements-token.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/stream-elements-token', service({Model}));
  app.service('/stream-elements-token').hooks(hooks);
}
