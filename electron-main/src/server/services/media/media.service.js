const hooks = require('./media.hooks');
const NeDB = require('nedb');
const service = require('feathers-nedb');

const Model = new NeDB({
  filename: './data/media.db',
  autoload: true
});

module.exports = function (app) {
  app.use('/media', service({Model}));
  app.service('/media').hooks(hooks);
}
