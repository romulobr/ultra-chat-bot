const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {verifyPermissions} = require('../util/permission-verifier');
const {verifyLoyalty} = require('../util/loyalty-verifier');
const {CoolDownManager} = require('../util/cool-down-manager');
const urls = require('../../../urls');

class MediaPlayerChatApp {
  constructor(settings) {
    this.settings = settings;
    this.commands = settings.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
  }

  async handleMessage(message) {
    if (!verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInText(message.text, this.commands);
    if (!command) return;

    const mediaUrl = urls.media + '/' + this.settings.items[command.index].url;
    const screenMessage = {
      isMedia: true,
      command,
      url: mediaUrl,
      author: message.author,
      videoTop: this.settings.options.video.top,
      videoLeft: this.settings.options.video.left,
      videoWidth: this.settings.options.video.size
    };
    if (await !verifyLoyalty(this.settings.options.loyalty, message, this.settings.user)) return;
    sendScreenMessage(screenMessage);
    this.cooldownManager.addCoolDownTo(message.author);
  }
}

module.exports = MediaPlayerChatApp;
