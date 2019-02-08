const sendScreenMessage = require('../util/send-screen-message');
const getNews = require('../../news-feed/news-feed-parser');
const flatten = require('array-flatten');
const commands = require('../util/command-in-text');
const {verifyPermissions} = require('../util/permission-verifier');
const {CoolDownManager} = require('../util/cool-down-manager');
const urls = require('../../../urls');

let shuffle = function (array) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

};

class NewsChatApp {
  constructor(settings) {
    this.settings = settings;
    this.feeds = settings.options.news;
    this.refreshInterval = settings.options.refreshInterval || 60;
    this.showInterval = settings.options.showInterval || 5;
    this.maximumDescriptionSize = settings.options.maximumDescriptionSize || 1000;
    this.screenTime = settings.options.screenTime || 60;
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
    this.playAudio = settings.options.playAudio;
    this.audioUrl = settings.options.audioUrl;

    if (settings.permissions.enabled) {
      this.refresh();
      this.refreshIntervalId = setInterval(() => {
        this.refresh()
      }, (this.refreshInterval) * 60000);

      this.showIntervalId = setInterval(() => {
        this.showNews()
      }, (this.showInterval) * 60000);
    }
  }

  showNews() {
    console.log('showing news');
    if (!this.news) {
      console.log('no news to show, skipping...');
      return;
    }
    let news = this.news[this.newsIndex || 0];
    this.newsIndex++;

    if (!news) {
      this.newsIndex = 0;
      news = this.news[0];
    }
    if (!news) {
      return;
    }
    this.newsLink = news.link;
    console.log(news);
    const screenMessage = {
      "isNewsItem": "true",
      "title": news.title,
      "description": news.description && news.description.substr(0, this.maximumDescriptionSize),
      "image": news.image,
      "duration": this.screenTime
    };

    sendScreenMessage(screenMessage, this.settings.options.source && this.settings.options.source.customSource);
    if (this.playAudio) {
      const audioScreenMessage = {
        isMedia: true,
        url: urls.media + '/' + this.audioUrl
      };
      sendScreenMessage(audioScreenMessage, this.settings.options.source && this.settings.options.source.customSource);
    }
  }

  refresh() {
    this.news = [];
    this.feeds.forEach(feed => {
      getNews(feed.url, feed.encoding || 'utf-8').then(result => {
        this.news = this.news.concat(result.slice(1, 25));
        shuffle(this.news);
        console.log('got ', result.length, ' news from ', feed.url);
      }).catch(error => console.log('error fetching news', error));
    });
    this.newsIndex = 0;
  }

  stop() {
    clearInterval(this.refreshIntervalId);
    clearInterval(this.showIntervalId);
  }

  async handleMessage(message) {
    if (!verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInFirstWord(message.text, [this.settings.options.getLinkCommand]);
    if (!command) return;

    if (command.command === this.settings.options.getLinkCommand || 'news') {
      console.log('showing link', this.newsLink);
      this.newsLink && this.say('read more at ' + this.newsLink);
    }
  }
}

module.exports = NewsChatApp;
