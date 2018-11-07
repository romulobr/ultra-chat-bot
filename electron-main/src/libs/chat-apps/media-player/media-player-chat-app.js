const commandInText = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {changeUserPoints, fetchUserPoints} = require('../../../server/stream-elements-api/stream-elements-api');
const urls = require('../../../urls');

class MediaPlayerChatApp {

  constructor(settings) {
    this.user = settings.user;
    this.media = settings.items;
    this.enabledForChat = settings.enabledForChat;
    this.moderatorsOnly = settings.moderatorsOnly;
    this.costPerChatPlay = settings.costPerChatPlay;
    this.enableStreamElementsIntegration = settings.enableStreamElementsIntegration;
    this.streamElementsIntegrationFailed = false;
    this.commands = settings.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
  }

  static checkModeration(author) {
    return author.isChatModerator || author.isChatOwner;
  }

  async checkStreamElementsPoints(author) {
    if (this.streamElementsIntegrationFailed) {
      return true;
    }
    try {
      const amount = this.costPerChatPlay * -1;
      const fetch = await fetchUserPoints(this.user.jwt, author.userName);
      if (fetch.data.points > this.costPerChatPlay) {
        changeUserPoints(this.user.jwt, author.userName, amount);
        return true;
      }
    }
    catch (e) {
      this.streamElementsIntegrationFailed = true;
      return true;
    }
  }

  async handleMessage(message) {
    if (this.enabledForChat) {
      let command = commandInText(message.text, this.commands);
      if (command) {
        if (MediaPlayerChatApp.checkModeration(message.author)) {
          if (this.enableStreamElementsIntegration) {
            const pointsOk = await this.checkStreamElementsPoints(message.author);
            if (pointsOk) {
              const mediaUrl = urls.media + '/' + this.media[command.index].url;
              const screenMessage = {media: mediaUrl, author: message.author};
              sendScreenMessage(screenMessage);
            }
          }
        }
      }
    }
  }
}

module
  .exports = MediaPlayerChatApp;
