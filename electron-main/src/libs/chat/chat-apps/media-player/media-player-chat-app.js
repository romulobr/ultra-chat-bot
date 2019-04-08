const commands = require("../../util/command-in-text");
const ChatApp = require("../../ChatApp");
const urls = require('../../../../urls');

class MediaPlayerChatApp extends ChatApp {

  setUp(settings) {
    settings.options = settings.options || {};
    this.items = settings.options.items;
    this.commands = (settings.options.items && settings.options.items.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())) || [];
    this.loyaltyProfiles = settings.loyaltySystem.getLoyaltyProfiles();
    this.defaultVolume = settings.options.defaultVolume;
  }

  prepareMessage(message) {
    let command = commands.commandInText(message.text, this.commands);
    if (command) {
      const item = this.items[command.index];
      if (item) {
        return {...message, loyaltyCost: item.cost, item, command}
      }
    }
    return message;
  }

  messageHandler(message) {
    const mediaUrl = urls.media + '/' + message.item.url;
    const screenMessage = {
      isMedia: true,
      command: message.command,
      url: mediaUrl,
      volume: message.item.volumeOverride || this.defaultVolume || 1,
      author: message.author
    };
    this.sendScreenMessage(screenMessage);
    this.cooldownManager.addCoolDownTo(message.author);
  }
}

module.exports = MediaPlayerChatApp;
