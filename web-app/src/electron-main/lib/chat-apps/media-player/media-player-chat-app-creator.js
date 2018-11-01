const urls = require('../../../urls');
const axios = require('axios');
const MediaPlayerChatApp = require('./media-player-chat-app');

function create(user) {
    return new Promise((success, fail) => {
        axios.get(urls.mediaApi, {
            headers: {Authorization: 'Bearer ' + user.jwt}
        }).then(response => {
            const media = response.data[0].items;
            success(new MediaPlayerChatApp(media));
        }).catch(e => {
            fail(e);
        });
    });
}

module.exports = create;
