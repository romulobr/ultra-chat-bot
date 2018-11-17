const urls = require('../../../urls');
const axios = require('axios');
const EmotionsChatApp = require('./emotions-chat-app');

function create(user) {
    return new Promise((success, fail) => {

        axios.get(urls.emotionsApi, {
            headers: {Authorization: 'Bearer ' + user.jwt}
        }).then(response => {
            const settings = response.data[0] || {};
            settings.user=user;
            success(new EmotionsChatApp(settings));
        }).catch(e => {
            fail(e);
        });
    });
}

module.exports = create;
