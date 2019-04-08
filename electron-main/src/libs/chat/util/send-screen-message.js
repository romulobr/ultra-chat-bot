const urls = require('../../../urls');
const axios = require('axios');

function sendScreenMessage(message, source) {
  return axios.post(urls.messageApi, {...message, source});
}

module.exports = sendScreenMessage;
