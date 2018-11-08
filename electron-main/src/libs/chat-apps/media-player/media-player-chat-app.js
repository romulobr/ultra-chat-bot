const commandInText = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {changeUserPoints, fetchUserPoints} = require('../../../server/stream-elements-api/stream-elements-api');
const urls = require('../../../urls');

class MediaPlayerChatApp {

  constructor(settings) {
    this.settings = settings;
    this.commands = settings.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
  }

  static checkModeration(author) {
    return author.isChatModerator || author.isChatOwner;
  }

  async checkStreamElementsPoints(author) {
    if (this.streamElementsIntegrationFailed || this.costPerChatPlay === 0) {
      return true;
    }
    try {
      const amount = this.costPerChatPlay * -1;
      const fetch = await fetchUserPoints(this.user.jwt, author.userName);
      if (fetch.data.points >= this.costPerChatPlay) {
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
    if (this.settings.enabledForChat) {
      if (!this.settings.allowCommandsWithoutExclamation && message.text[0] !== '!') return;

      let command = commandInText(message.text, this.commands);
      if (!command) return;

      if (!MediaPlayerChatApp.checkModeration(message.author)) return;

      if (this.settings.enableStreamElementsIntegration){
        const pointsOk = await this.checkStreamElementsPoints(message.author);
        if (!pointsOk) return;
      }

      const mediaUrl = urls.media + '/' + this.settings.items[command.index].url;
      const screenMessage = {media: mediaUrl, author: message.author};
      sendScreenMessage(screenMessage);
    }
  }
}

module
  .exports = MediaPlayerChatApp;
