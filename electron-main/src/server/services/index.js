const users = require('./users/users.service.js');
const media = require('./media/media.service.js');
const streamElementsToken = require('./stream-elements-token/stream-elements-token.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(media);
  app.configure(streamElementsToken);
};
