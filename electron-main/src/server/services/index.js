const users = require('./users/users.service.js');
const media = require('./media/media.service.js');
const chicken = require('./chicken/chicken.service.js');
const streamElementsToken = require('./stream-elements-token/stream-elements-token.service');
const streamLabsToken = require('./stream-labs/stream-labs.service');
const emotions = require('./icons/icons.service');
module.exports = function (app) {
  app.configure(users);
  app.configure(media);
  app.configure(chicken);
  app.configure(streamElementsToken);
  app.configure(streamLabsToken);
  app.configure(emotions);
};
