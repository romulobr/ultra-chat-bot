const cleanText = require('../util/command-in-text').cleanText;
const sendScreenMessage = require('../util/send-screen-message');
const wordList = require('./word-list');

class MediaPlayerChatApp {

  constructor(settings) {
    this.settings = settings;
    this.settings.wordList = wordList
  }

  static hasPermission(author) {
    return author.isChatModerator || author.isChatOwner;
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

  emotionsInText(text) {
    const emotions = [];
    const emotionTypes = Object.keys(wordList);
    for (let i = 0; i < emotionTypes.length; i++) {
      const emotionWords = wordList[emotionTypes[i]];
      const filtered = emotionWords.filter(word => text.includes(word));
      if (filtered.length > 0) {
        emotions.push(emotionTypes[i]);
        console.log('word>', filtered);
      }
    }

    return emotions;
  }

  async handleMessage(message) {
    // if (!this.settings.enabledForChat) return;
    // if (this.blockedByCooldown.global) return;
    // if (this.isAuthorBlockedByCoolDown(message.author)) return;
    //
    // if (!this.settings.allowCommandsWithoutExclamation && message.text[0] !== '!') return;

    const emotions = this.emotionsInText(cleanText(message.text));
    // if (this.settings.moderatorsOnly && !MediaPlayerChatApp.hasPermission(message.author)) return;
    if (emotions.length > 0) {
      console.log(emotions);
      console.log(message.text);
      const screenMessage = {isEmotions: true, emotions};
      sendScreenMessage(screenMessage);
      this.addCoolDownTo(message.author);
    }
  }
}

module.exports = MediaPlayerChatApp;
