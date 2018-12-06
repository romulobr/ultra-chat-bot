const urls = require('../../../urls');
const axios = require('axios');
const ChickenChatApp = require('./chicken-chat-app');

function create(user) {
    return new Promise((success, fail) => {
        axios.get(urls.chickenApi, {
            headers: {Authorization: 'Bearer ' + user.jwt}
        }).then(response => {
            const settings = response.data[0];
            settings.user=user;
            success(new ChickenChatApp(settings));
        }).catch(e => {
            fail(e);
        });
    });
}

module.exports = create;
