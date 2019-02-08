const urls = require('../../../urls');
const axios = require('axios');
const LoyaltyChatApp = require('./news-chat-app');

function create(user) {
  return new Promise((success, fail) => {
    axios.get(urls.loyaltyApi, {
      headers: {Authorization: 'Bearer ' + user.jwt}
    }).then(response => {
      const settings = response.data[0] || {};
      settings.user = user;
      success(new LoyaltyChatApp(settings));
    }).catch(e => {
      fail(e);
    });
  });
}

module.exports = create;
