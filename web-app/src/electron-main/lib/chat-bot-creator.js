const twitchChatClient = require('./twitch/twitch-chat-client');
const validateTwitchUserTokenAndRefreshIfNeeded = require('./twitch/validate-twitch-user-tokens-and-refresh-if-needed');

function createBotFor(user) {
    return new Promise((success, fail) => {
        if (user.origin === 'twitch') {
            validateTwitchUserTokenAndRefreshIfNeeded(user).then(user => {
                success(twitchChatClient.create(user));
            }).catch(e => {
                //console.log(e);
                fail(e);
            });
        }
    });
}

module.exports = createBotFor;
