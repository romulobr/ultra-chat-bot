const config = require('../../server/config/default.json').authentication.twitch;

const username = config.userName;
const clientId = config.clientID;
const clientSecret = config.clientSecret;
const redirectUrl = config.callbackURL;
const scope = config.scope;

module.exports = {clientId, clientSecret, redirectUrl, scope, username};
