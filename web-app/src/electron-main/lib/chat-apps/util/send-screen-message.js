const urls = require('../../../urls');
const axios = require('axios');

function sendScreenMessage(message) {
    return axios.post(urls.messageApi, message);
}

module.exports = sendScreenMessage;
