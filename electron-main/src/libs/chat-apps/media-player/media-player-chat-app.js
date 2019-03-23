const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const {verifyPermissions} = require('../util/permission-verifier');
const {verifyLoyalty} = require('../util/loyalty-verifier');
const {CoolDownManager} = require('../util/cool-down-manager');
const urls = require('../../../urls');

class MediaPlayerChatApp {
  constructor(settings) {
    settings.options = settings.options || {};
    this.settings = settings;
    this.user = this.settings.user;
    this.items = settings.options.items;
    this.loyalty = settings.loyalty;
    this.settings.options = this.settings.options || {};
    this.customSource = this.settings.source && this.settings.source.customSource;
    this.options = this.settings.options;
    this.commands = (settings.options.items && settings.options.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())) || [];
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
    this.loyaltyProfiles = settings.loyaltySystem.getLoyaltyProfiles();
    this.defaultVolume = settings.options.defaultVolume;
  }

  async handleMessage(message) {
    if (!verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInText(message.text, this.commands);
    if (!command) return;

    const item = this.items[command.index];
    const mediaUrl = urls.media + '/' + item.url;
    const screenMessage = {
      isMedia: true,
      command,
      url: mediaUrl,
      volume: item.volumeOverride || this.defaultVolume || 1,
      author: message.author
    };
    const loyaltyVerified = await verifyLoyalty(this.loyalty, message, this.user, item.cost, this.loyaltyProfiles);
    if (!loyaltyVerified) return;
    sendScreenMessage(screenMessage, this.customSource);
    this.cooldownManager.addCoolDownTo(message.author);
  }
}

module.exports = MediaPlayerChatApp;
