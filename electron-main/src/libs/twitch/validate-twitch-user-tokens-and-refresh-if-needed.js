const querystring = require('querystring');
const twitchCredentials = require('./twitch-credentials');
const axios = require('axios');

function validateTwitchUserAndRefreshIfNeeded(user) {
    return new Promise((success, fail) => {
        axios.get('https://id.twitch.tv/oauth2/validate', {
            headers: {Authorization: `OAuth ${user.accessToken}`}
        }).then(()=> {
            console.log('user validation success\n');
            success(user);
        }).catch(e => {
            console.log('user validation failed\n');
            if (e.response.status === 401) {
                console.log('requesting new tokens\n');
                axios.post('https://id.twitch.tv/oauth2/token', querystring.stringify({
                    grant_type: 'refresh_token',
                    refresh_token: user.refreshToken,
                    client_id: twitchCredentials.clientId,
                    client_secret: twitchCredentials.clientSecret
                }), {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(result => {
                    console.log('refreshed user\n', result);
                    const newUser = {...user,acessToken:result.data.access_token, refreshToken:result.data.refresh_token}
                    success(newUser);
                });
            } else {
                console.log(e.data);
                fail(e);
            }
        });
    });
}

module.exports = validateTwitchUserAndRefreshIfNeeded;
