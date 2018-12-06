const urls = require('../../../urls');
const axios = require('axios');
const WelcomeChatApp = require('./welcome-chat-app');

function create(user) {
    return new Promise((success, fail) => {
        axios.get(urls.welcomeApi, {
            headers: {Authorization: 'Bearer ' + user.jwt}
        }).then(response => {
            const settings = response.data[0];
            settings.user=user;
            success(new WelcomeChatApp(settings));
        }).catch(e => {
            fail(e);
        });
    });
}

module.exports = create;
