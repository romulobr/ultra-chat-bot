const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {streamElements} = require('../../../server/stream-elements-api/stream-elements-api');
const {streamlabs} = require('../../../server/stream-labs-api/stream-labs-api');
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
      const fetch = await streamElements.fetchUserPoints(this.user.jwt, author.userName);
      if (fetch.data.points >= this.settings.costPerChatPlay) {
        streamElements.changeUserPoints(this.settings.user.jwt, author.userName, amount);
        return true;
      }
    }
    catch (e) {
      this.streamElementsIntegrationFailed = true;
      return true;
    }
  }

  async checkStreamlabsPoints(author) {
    if (this.streamlabsIntegrationFailed || this.settings.costPerChatPlay === 0) {
      return true;
    }
    try {
      const pointsResponse = await streamlabs.fetchPoints(this.settings.user.jwt, author.userName);
      const points = pointsResponse.data.points;
      if (points < this.settings.costPerChatPlay) {
        return false;
      }
      await streamlabs.subtractPoints(this.settings.user.jwt, author.userName, this.settings.costPerChatPlay);
      return true;
    }
    catch (e) {
      if (e.message === 'User does not have enough points') {
        return false;
      }
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

    let command = commands.commandInText(message.text, this.commands);
    if (!command) return;

    if (this.settings.moderatorsOnly && !MediaPlayerChatApp.hasPermission(message.author)) return;

    if (this.settings.enableStreamElementsIntegration) {
      const pointsOk = await this.checkStreamElementsPoints(message.author);
      if (!pointsOk) return;
    }

    if (this.settings.enableStreamlabsIntegration) {
      const pointsOk = await this.checkStreamlabsPoints(message.author);
      if (!pointsOk) return;
    }


    const mediaUrl = urls.media + '/' + this.settings.items[command.index].url;
    const screenMessage = {
      isMedia: true,
      command,
      url: mediaUrl,
      author: message.author,
      videoLeft: this.settings.videoLeft,
      videoTop: this.settings.videoTop,
      videoWidth: this.settings.videoWidth
    };
    sendScreenMessage(screenMessage);
    this.addCoolDownto(message.author);
  }
}

module.exports = MediaPlayerChatApp;
