const ChatApp = require("../../ChatApp");
const getNews = require('../../../news-feed/news-feed-parser');
const commands = require('../../util/command-in-text');
const urls = require('../../../../urls');

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

class NewsChatApp extends ChatApp {

  setUp(settings) {
    this.feeds = settings.options.newsFeeds || [];
    this.refreshIntervalInMinutes = settings.options.refreshIntervalInMinutes || 60;
    this.showIntervalInMinutes = settings.options.showIntervalInMinutes || 5;
    this.maximumDescriptionSize = settings.options.maximumDescriptionSize || 1000;
    this.customSource = this.settings.source && this.settings.source.customSource;
    this.screenTime = settings.options.screenTime || 60;
    this.playAudio = settings.options.playAudio;
    this.audioUrl = settings.options.audioUrl;

    if (settings.permissions.enabled) {
      this.refresh();
      this.refreshIntervalId = setInterval(() => {
        this.refresh()
      }, this.refreshIntervalInMinutes * 60000);

      this.showIntervalId = setInterval(() => {
        this.showNews()
      }, this.showIntervalInMinutes * 60000);
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

    this.sendScreenMessage(screenMessage);

    if (this.playAudio) {
      const audioScreenMessage = {
        isMedia: true,
        url: urls.media + '/' + this.audioUrl
      };
      this.sendScreenMessage(audioScreenMessage);
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

  messageHandler(message) {
    let command = commands.commandInFirstWord(message.text, [this.settings.options.getLinkCommand]);
    if (!command) return;
    if (command.command === this.settings.options.getLinkCommand || 'news') {
      console.log('showing link', this.newsLink);
      this.newsLink && this.say('read more at ' + this.newsLink);
    }
  }
}

module.exports = NewsChatApp;
