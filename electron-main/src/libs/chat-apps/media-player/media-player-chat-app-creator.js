const urls = require('../../../urls');
const axios = require('axios');
const MediaPlayerChatApp = require('./media-player-chat-app');

function create(user) {
    return new Promise((success, fail) => {

        axios.get(urls.mediaApi, {
            headers: {Authorization: 'Bearer ' + user.jwt}
        }).then(response => {
            const settings = response.data[0];
            settings.user=user;
            success(new MediaPlayerChatApp(settings));
        }).catch(e => {
            fail(e);
        });
    });
}

module.exports = create;
