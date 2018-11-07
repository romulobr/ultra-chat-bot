'use strict';

function normalizeYoutubeChatMessage(youtubeMessage) {
  return {
    source: 'youtube',
    id: youtubeMessage.id,
    text: youtubeMessage.snippet.displayMessage,
    liveChatId: youtubeMessage.snippet.liveChatId,
    publishedAt: youtubeMessage.snippet.publishedAt,
    author: {
      source: 'youtube',
      id: 'yt-'+youtubeMessage.snippet.authorChannelId,
      name: youtubeMessage.authorDetails.displayName,
      userName: youtubeMessage.authorDetails.channelId,
      image: youtubeMessage.authorDetails.profileImageUrl,
      isChatOwner: youtubeMessage.authorDetails.isChatOwner,
      isChatSponsor: youtubeMessage.authorDetails.isChatSponsor,
      isChatModerator: youtubeMessage.authorDetails.isChatModerator,
    }
  };
}

module.exports = normalizeYoutubeChatMessage;

/* example raw message
{
  "kind": "youtube#liveChatMessage",
  "etag": "\"m2yskBQFythfE4irbTIeOgYYfBU\/Lx1V4evCjLDJ7-H4s-N99xadmhk\"",
  "id": "LCC.CiMSIQoYVUNLTjdva2RoOFlPYVBZUERBT2Eyckl3EgUvbGl2ZRIcChpDTF9DOHM2RDNOVUNGWWdZVGdvZGh3RU5LUQ",
  "snippet": {
    "type": "textMessageEvent",
    "liveChatId": "EiEKGFVDS043b2tkaDhZT2FQWVBEQU9hMnJJdxIFL2xpdmU",
    "authorChannelId": "UCKN7okdh8YOaPYPDAOa2rIw",
    "publishedAt": "2017-08-16T15:05:26.976Z",
    "hasDisplayContent": true,
    "displayMessage": "\ud83d\udc2eRomulino! \ud83d\udc96:9",
    "textMessageDetails": {
      "messageText": "\ud83d\udc2eRomulino! \ud83d\udc96:9"
    }
  },
  "authorDetails": {
    "channelId": "UCKN7okdh8YOaPYPDAOa2rIw",
    "channelUrl": "http:\/\/www.youtube.com\/channel\/UCKN7okdh8YOaPYPDAOa2rIw",
    "displayName": "Romulino",
    "profileImageUrl": "https:\/\/yt3.ggpht.com\/-0MZLFsJ8hgw\/AAAAAAAAAAI\/AAAAAAAAAAA\/dY8bqP3dysM\/s88-c-k-no-mo-rj-c0xffffff\/photo.jpg",
    "isVerified": false,
    "isChatOwner": true,
    "isChatSponsor": false,
    "isChatModerator": false
  },
  "level": "info",
  "message": "message received",
  "timestamp": "2017-08-16T15:05:54.074Z"
}
*/
