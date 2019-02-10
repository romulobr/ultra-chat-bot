const cleanText = require('../util/command-in-text').cleanText;
const sendScreenMessage = require('../util/send-screen-message');
const {CoolDownManager} = require('../util/cool-down-manager');
const mediaUrl = require('../../../urls').media;

class IconsChatApp {

  constructor(settings) {
    settings.options = settings.options || {};
    this.settings = settings;
    this.wordList = (settings.options.icons && settings.options.icons.map(icon => {
      return {
        image: icon.image,
        words: icon.words.split(' ')
      }
    })) || [];
    // this.settings.wordList = settings.;
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
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

  async handleMessage(message) {
    const icons = this.iconsInText(cleanText(message.text));
    if (icons.length > 0) {
      icons.forEach(icon => {
        console.log(`icon ${icon} found in message: ${message.text}`);
        const screenMessage = {isIcons: true, icon};
        sendScreenMessage(screenMessage, this.settings.options.source && this.settings.options.source.customSource);
      });
      this.cooldownManager.addCoolDownTo(message.author);
    }
  }
}

module.exports = IconsChatApp;
