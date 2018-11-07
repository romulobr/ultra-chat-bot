'use strict';

function normalizeTwitchChatMessage(twitchMessage) {
  let isChatOwner = twitchMessage.userState['badges-raw'] ? twitchMessage.userState['badges-raw'].includes('broadcaster/1') : false;
  let isChatSponsor = twitchMessage.userState['badges-raw'] ? twitchMessage.userState['badges-raw'].includes('subscriber/1') : false;
  let result = {
    source: 'twitch',
    id: twitchMessage.userState.id,
    text: twitchMessage.message,
    liveChatId: twitchMessage.channel,
    publishedAt: twitchMessage.userState['tmi-sent-ts'],
    author: {
      source: 'twitch',
      id: 'tw-' + twitchMessage.userState['user-id'],
      name: twitchMessage.userState['display-name'],
      userName: twitchMessage.userState['username'],
      isChatOwner: isChatOwner,
      isChatSponsor: isChatSponsor,
      isChatModerator: twitchMessage.userState.mod,
    }
  };
  return result;
}

module.exports = normalizeTwitchChatMessage;

/* example raw message
{
   "channel":"#romulinotv",
   "userState":{
      "badges":{
         "broadcaster":"1",
         "subscriber":"0"
      },
      "color":"#00FF7F",
      "display-name":"romulinoTV",
      "emotes":null,
      "id":"5d853a9d-ab0b-4f64-89bd-e99cd37a1df9",
      "mod":false,
      "room-id":"6953291",
      "subscriber":true,
      "tmi-sent-ts":"1524695243880",
      "turbo":false,
      "user-id":"6953291",
      "user-type":null,
      "emotes-raw":null,
      "badges-raw":"broadcaster/1,subscriber/0",
      "username":"romulinotv",
      "message-type":"chat"
   },
   "message":"hehehe",
   "self":false
}
*/
