const commandInText = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {changeUserPoints, fetchUserPoints} = require('../../../server/stream-elements-api/stream-elements-api');
const urls = require('../../../urls');

class MediaPlayerChatApp {

  constructor(settings) {
    this.settings = settings;
    this.commands = settings.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    this.blockedByCooldown = {global: false};
  }

  static hasPermission(author) {
    return author.isChatModerator || author.isChatOwner;
  }

  async checkStreamElementsPoints(author) {
    if (this.streamElementsIntegrationFailed || this.settings.costPerChatPlay === 0) {
      return true;
    }
    try {
      const amount = this.settings.costPerChatPlay * -1;
      const fetch = await fetchUserPoints(this.user.jwt, author.userName);
      if (fetch.data.points >= this.settings.costPerChatPlay) {
        changeUserPoints(this.settings.user.jwt, author.userName, amount);
        return true;
      }
    }
    catch (e) {
      this.streamElementsIntegrationFailed = true;
      return true;
    }
  }

  isAuthorBlockedByCoolDown(author) {
    return this.blockedByCooldown[author.userName];
  }

  removeCoolDownFrom(author) {
    delete this.blockedByCooldown[author.userName];
  }

  addCoolDownto(author) {
    if (this.settings.perUserCooldown && !isNaN(this.settings.perUserCooldown) && this.settings.perUserCooldown > 0) {
      this.blockedByCooldown[author.userName] = true;
      setTimeout(() => this.removeCoolDownFrom(author), this.settings.perUserCooldown * 1000)
    }
  }

  async handleMessage(message) {
    if (!this.settings.enabledForChat) return;
    if (this.blockedByCooldown.global) return;
    if (this.isAuthorBlockedByCoolDown(message.author)) return;

    if (!this.settings.allowCommandsWithoutExclamation && message.text[0] !== '!') return;

    let command = commandInText(message.text, this.commands);
    if (!command) return;

    if (this.settings.moderatorsOnly && !MediaPlayerChatApp.hasPermission(message.author)) return;

    if (this.settings.enableStreamElementsIntegration) {
      const pointsOk = await this.checkStreamElementsPoints(message.author);
      if (!pointsOk) return;
    }

    const mediaUrl = urls.media + '/' + this.settings.items[command.index].url;
    const screenMessage = {media: mediaUrl, author: message.author};
    sendScreenMessage(screenMessage);
    this.addCoolDownto(message.author);
  }
}

module.exports = MediaPlayerChatApp;
