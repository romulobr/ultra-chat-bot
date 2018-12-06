const {CoolDownManager} = require('../util/cool-down-manager');
const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const permissionVerifier = require('../util/permission-verifier');

class ChickenChatApp {

  constructor(settings) {
    this.settings = settings;
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
  }

  async handleMessage(message) {
    if (!permissionVerifier.verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInFirstWord(message.text, [this.settings.options.moveCommand, this.settings.options.sayCommand, this.settings.volunteerCommand]);
    if (!command) return;

    if (command.command === this.settings.options.moveCommand) {
      const split = message.text.split(' ');
      if (!isNaN(split[1]) && !isNaN(split[2])) {
        const screenMessage = {chicken: {move: {x: split[1], y: split[2]}}};
        sendScreenMessage(screenMessage);
      }
    }
    else if (command.command === this.settings.options.sayCommand) {
      const theMessage = message.text.replace('!' + this.settings.options.sayCommand, '').replace(this.settings.options.sayCommand, '').substr(0, 75);
      const screenMessage = {chicken: {say: theMessage, sound: this.settings.options.enableSound}};
      sendScreenMessage(screenMessage);
    }
  }
}

module.exports = ChickenChatApp;
