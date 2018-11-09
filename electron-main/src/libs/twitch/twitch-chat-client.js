const normalizeTwitchChatMessage = require('../twitch/twitch-chat-message-normalizer');
const twitchCredentials = require('./twitch-credentials');
const twitchJs = require("twitch-js");

function create(user, apps) {
  const channel = user.name;
  const options = {
    channels: [`#${channel}`],
    identity: {
      username: twitchCredentials.chatBotUsername,
      password: twitchCredentials.chatBotOauthToken
    },
    connection: {
      reconnect: true,
      secure: false
    }
  };

  console.log('creating twitch chat bot\n', options);
  const client = new twitchJs.client(options);

  function stop() {
    client.disconnect();
  }

  let showedConnectionStatus = false;
  client.on('chat', (channel, userState, message, self) => {
    let normalizedMessage = normalizeTwitchChatMessage({message, userState, channel, self});
    apps.forEach(app => {
      app.handleMessage(normalizedMessage)
    });
    console.log(`Got message| ${normalizedMessage.author.name}: ${normalizedMessage.text}`);
  });
  client.on('join', function (channel) {
    if (!showedConnectionStatus) {
      client.say(channel, '🐮 Hi!');
      showedConnectionStatus = true;
    }
  });
  client.connect();
  return stop;
}

module.exports = {
  create
};
