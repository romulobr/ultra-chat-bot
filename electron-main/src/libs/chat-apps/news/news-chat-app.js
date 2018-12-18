const sendScreenMessage = require('../util/send-screen-message');
const getNews = require('../../news-feed/news-feed-parser');
const flatten = require('array-flatten');

class NewsChatApp {
  constructor(settings) {
    this.settings = settings;
    this.feeds = settings.options.news;
    this.refreshInterval = settings.options.refreshInterval || 60;
    this.showInterval = settings.options.showInterval || 5;
    this.maximumDescriptionSize = settings.options.maximumDescriptionSize || 600;
    this.screenTime = settings.options.screenTime || 60;

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
    const news = this.news[this.newsIndex || 0];
    sendScreenMessage({
      "isNewsItem": "true",
      "title": news.title,
      "text": news.description.substr(0, this.maximumDescriptionSize),
      "image": news.image,
      "duration": this.screenTime
    });
    this.newsIndex++;
  }

  refresh() {
    const newsPromises = [];
    this.feeds.forEach(feed => {
      newsPromises.push(getNews(feed.url, feed.encoding));
    });
    Promise.all(newsPromises).then(results => {
      this.news = flatten(results);
      console.log('got news', this.news);
    });
    this.newsIndex = 0;
  }

  stop() {
    clearInterval(this.refreshIntervalId);
    clearInterval(this.showIntervalId);
  }

  async handleMessage() {
    return Promise.resolve();
  }
}

module.exports = NewsChatApp;
