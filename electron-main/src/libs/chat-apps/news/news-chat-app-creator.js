const urls = require('../../../urls');
const axios = require('axios');
const NewsChatApp = require('./news-chat-app');

function create(user) {
  return new Promise((success, fail) => {
    axios.get(urls.newsApi, {
      headers: {Authorization: 'Bearer ' + user.jwt}
    }).then(response => {
      const settings = response.data[0] || {};
      settings.user = user;
      success(new NewsChatApp(settings));
    }).catch(e => {
      fail(e);
    });
  });
}

module.exports = create;
