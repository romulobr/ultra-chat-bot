const axios = require('axios');

function create(user, app, settingsUrl, loyaltySystem) {
  return new Promise((success, fail) => {
    axios.get(settingsUrl, {
      headers: {Authorization: 'Bearer ' + user.jwt}
    }).then(response => {
      const settings = response.data[0] || {permissions: {enabled: true}};
      settings.user = user;
      settings.loyaltySystem = loyaltySystem;
      if (settings.permissions && settings.permissions.enabled) {
        success(new app(settings));
      } else {
        fail('app is disabled');
      }
    }).catch(e => {
      fail(e);
    });
  });
}

module.exports = create;
