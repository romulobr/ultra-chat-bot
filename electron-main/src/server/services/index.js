const users = require('./users/users.service');
const media = require('./media/media.service');
const chicken = require('./chicken/chicken.service');
const welcome = require('./welcome/welcome.service');
const welcomeMessages = require('./welcome/welcome-messages.service');
const streamElementsToken = require('./stream-elements-token/stream-elements-token.service');
const streamLabsToken = require('./stream-labs/stream-labs.service');
const icons = require('./icons/icons.service');
const news = require('./news/news.service');
const test = require('./test/test.service');
const loyalty = require('./loyalty/loyalty.service');
const loyaltyProfile = require('./loyalty/loyalty-profile.service');
const quiz = require('./quiz/quiz.service');

module.exports = function (app) {
  app.configure(users);
  app.configure(media);
  app.configure(chicken);
  app.configure(streamElementsToken);
  app.configure(streamLabsToken);
  app.configure(icons);
  app.configure(news);
  app.configure(welcome);
  app.configure(welcomeMessages);
  app.configure(loyalty);
  app.configure(loyaltyProfile);
  app.configure(quiz);
};
