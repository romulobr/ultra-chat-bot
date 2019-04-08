const mediaUrl = require('../../../../urls').media;
const ChatApp = require("../../ChatApp");
const cleanText = require('../../util/command-in-text').cleanText;

class IconsChatApp extends ChatApp {

  setUp(settings) {
    super.setUp(settings);
    this.wordList = (settings.options.icons && settings.options.icons.map(icon => {
      return {
        image: icon.image,
        words: icon.words && icon.words.trim().split(' ')
      }
    })) || [];
  }

  iconsInText(text) {
    const icons = [];
    this.wordList.forEach(icon => {
      const filtered = icon.words.filter(word => text.includes(word));
      if (filtered.length > 0) {
        if (icon.image.includes('http://') || icon.image.includes('https://')) {
          icons.push(icon.image);
        } else {
          icons.push(`${mediaUrl}/${icon.image}`);
        }
      }
    });
    return icons;
  }

  messageHandler(message) {
    const icons = this.iconsInText(cleanText(message.text));
    if (icons.length > 0) {
      icons.forEach(icon => {
        console.log(`icon ${icon} found in message: ${message.text}`);
        const screenMessage = {isIcons: true, icon};
        this.sendScreenMessage(screenMessage);
      });
      this.cooldownManager.addCoolDownTo(message.author);
    }
  }
}

module.exports = IconsChatApp;
