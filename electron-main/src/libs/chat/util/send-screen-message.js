const urls = require('../../../urls');
const axios = require('axios');

function sendScreenMessage(message, source) {
  console.log('sending message to the screen, source:' + source);
  console.log(message);
  return axios.post(urls.messageApi, {...message, source});
}

module.exports = sendScreenMessage;
