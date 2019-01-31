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

    const item = this.settings.items[command.index];
    const mediaUrl = urls.media + '/' + item.url;
    const screenMessage = {
      isMedia: true,
      command,
      url: mediaUrl,
      author: message.author,
      top: item.top || this.settings.options.video.top || 0,
      left: item.left || this.settings.options.video.left || 0,
      size: item.size || this.settings.options.video.size || 100
    };
    const loyaltyVerified = await verifyLoyalty(this.settings.options.loyalty, message, this.settings.user, item.cost);
    if (!loyaltyVerified) return;
    sendScreenMessage(screenMessage, this.settings.options.source.customSource);
    this.cooldownManager.addCoolDownTo(message.author);
  }
}

module.exports = MediaPlayerChatApp;
