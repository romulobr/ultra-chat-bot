const cleanText = require('../util/command-in-text').cleanText;
const sendScreenMessage = require('../util/send-screen-message');
const {CoolDownManager} = require('../util/cool-down-manager');
const mediaUrl = require('../../../urls').media;
const getNews = require('../../news-feed/news-feed-parser');

class NewsChatApp {
  constructor(settings) {
    this.settings = settings;
    this.wordList = settings.options.news.map(newsItem => {
      return {
        image: newsItem.image,
        words: newsItem.words.split(' ')
      }
    });
    if (settings.permissions.enabled) {
      this.intervalId =
    }
  }

  close(){

  }
  async handleMessage() {
    return Promise.resolve();
  }
}

module.exports = NewsChatApp;
