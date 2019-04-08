const ChatApp = require("../../ChatApp");
const commands = require('../../util/command-in-text');

class ChickenChatApp extends ChatApp {

  messageHandler(message) {
    console.log('handling chicken message');
    let command = commands.commandInFirstWord(message.text, [this.options.moveCommand, this.options.sayCommand]);
    if (!command) return;

    if (command.command === this.options.moveCommand) {
      const split = message.text.split(' ');
      if (!isNaN(split[1]) && !isNaN(split[2])) {
        const screenMessage = {chicken: {move: {x: split[1], y: split[2]}}};
        this.sendScreenMessage(screenMessage);
        this.cooldownManager.addCoolDownTo(message.author);
      }
    }
    else if (command.command === this.options.sayCommand) {
      const theMessage = message.text.replace('!' + this.options.sayCommand, '').replace(this.options.sayCommand, '').substr(0, 75);
      const screenMessage = {chicken: {say: theMessage, sound: this.options.enableSound}};
      this.sendScreenMessage(screenMessage);
      this.cooldownManager.addCoolDownTo(message.author);
    }
  }
}

module.exports = ChickenChatApp;
