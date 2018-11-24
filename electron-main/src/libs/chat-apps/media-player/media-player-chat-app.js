const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {verifyPermissions} = require('../util/permission-verifier');
const {verifyLoyalty} = require('../util/loyalty-verifier');
const urls = require('../../../urls');

class MediaPlayerChatApp {

  constructor(settings) {
    this.settings = settings;
    this.commands = settings.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    this.blockedByCooldown = {global: false};
  }

  isAuthorBlockedByCoolDown(author) {
    return this.blockedByCooldown[author.userName];
  }

  removeCoolDownFrom(author) {
    delete this.blockedByCooldown[author.userName];
  }

  addCoolDownTo(author) {
    if (this.settings.perUserCooldown && !isNaN(this.settings.perUserCooldown) && this.settings.perUserCooldown > 0) {
      this.blockedByCooldown[author.userName] = true;
      setTimeout(() => this.removeCoolDownFrom(author), this.settings.perUserCooldown * 1000)
    }
  }

  async handleMessage(message) {
    if (!verifyPermissions(this.settings.permissions, message)) return;
    if (await !verifyLoyalty(this.settings.loyalty, message)) return;

    if (this.blockedByCooldown.global) return;
    if (this.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInText(message.text, this.commands);
    if (!command) return;

    const mediaUrl = urls.media + '/' + this.settings.items[command.index].url;
    const screenMessage = {
      isMedia: true,
      command,
      url: mediaUrl,
      author: message.author,
      videoTop: this.settings.video.top,
      videoLeft: this.settings.video.left,
      videoWidth: this.settings.video.size
    };
    sendScreenMessage(screenMessage);
    this.addCoolDownTo(message.author);
  }
}

module.exports = MediaPlayerChatApp;
