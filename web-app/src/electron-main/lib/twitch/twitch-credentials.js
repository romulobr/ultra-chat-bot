'use strict';

const username='romulinoTV';
const clientId = 'lo8otzdldve9jo662qmxk2m1eofjs8';
const clientSecret = 'lvi3xsneaxooie700fs7qylevxrgkd';
const redirectUrl = 'http://localhost:3000/auth/twitch/callback';
const scope = ['chat_login','user:read:email','user_read'];
module.exports = {clientId, clientSecret, redirectUrl, scope, username};
