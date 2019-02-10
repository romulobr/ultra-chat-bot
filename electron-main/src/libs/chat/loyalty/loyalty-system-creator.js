const urls = require('../../../urls');
const axios = require('axios');
const LoyaltySystem = require('./loyalty-system');

function create(user) {
  return new Promise((success, fail) => {
    axios.get(urls.loyaltyApi, {
      headers: {Authorization: 'Bearer ' + user.jwt}
    }).then(response => {
      const settings = response.data[0] || {};
      settings.user = user;
      success(new LoyaltySystem(settings));
    }).catch(e => {
      fail(e);
    });
  });
}

module.exports = create;
