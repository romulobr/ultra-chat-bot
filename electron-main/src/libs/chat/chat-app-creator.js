const axios = require('axios');

function create(user, app, settingsUrl, loyaltySystem) {
  return new Promise((success, fail) => {
    axios.get(settingsUrl, {
      headers: {Authorization: 'Bearer ' + user.jwt}
    }).then(response => {
      const settings = response.data[0];
      settings.user = user;
      settings.loyaltySystem = loyaltySystem;
      success(new app(settings));
    }).catch(e => {
      fail(e);
    });
  });
}

module.exports = create;
