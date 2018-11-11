const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');

class ChickenChatApp {

  constructor(settings) {
    console.log('chicken app started');
    this.settings = settings;
  }

  async handleMessage(message) {
    if (!this.settings.enabledForChat) return;
    if (!this.settings.allowCommandsWithoutExclamation && message.text[0] !== '!') return;

    let command = commands.commandInFirstWord(message.text, [this.settings.moveCommand, this.settings.sayCommand, this.settings.volunteerCommand]);
    if (!command) return;

    if (command.command === this.settings.moveCommand) {
      const split = message.text.split(' ');
      if (!isNaN(split[1]) && !isNaN(split[2])) {
        const screenMessage = {chicken: {move: {x: split[1], y: split[2]}}};
        sendScreenMessage(screenMessage);
      }
    }
    else if (command.command === this.settings.sayCommand) {
      const theMessage = message.text.replace('!' + this.settings.sayCommand,'').replace(this.settings.sayCommand,'').substr(0,75);
      const screenMessage = {chicken: {say: theMessage, sound: this.settings.soundEnabled}};
      sendScreenMessage(screenMessage);
    }
  }
}

module.exports = ChickenChatApp;
