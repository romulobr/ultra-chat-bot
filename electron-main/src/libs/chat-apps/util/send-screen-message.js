const urls = require('../../../urls');
const axios = require('axios');

function sendScreenMessage(message, source = 0) {
  return axios.post(urls.messageApi, {...message, source});
}

module.exports = sendScreenMessage;
