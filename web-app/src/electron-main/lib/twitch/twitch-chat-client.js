const normalizeTwitchChatMessage = require('../twitch/twitch-chat-message-normalizer');
const twitchJs = require("twitch-js");

function create(user) {
    const channel = user.name;
    const options = {
        channels: [`#${channel}`],
        identity: {
            username: user.name,
            password: `oauth:${user.accessToken}`
        },
        connection: {
            reconnect: true,
            secure:false
        }
    };

    console.log('creating twitch chat bot\n', options);
    const client = new twitchJs.client(options);

    function stop() {
        client.disconnect();
    }

    let showedConnectionStatus = false;
    client.on('chat', (channel, userState, message, self) => {
        console.log('got message from chat\n', normalizeTwitchChatMessage({message,userState,channel,self}))
    });
    client.on('join', function (channel) {
        if (!showedConnectionStatus) {
            client.say(channel, '🐮v3 on!');
            showedConnectionStatus = true;
        }
    });
    client.connect();
    return stop;
}

module.exports = {
    create
};
