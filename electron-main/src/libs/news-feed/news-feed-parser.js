const FeedParser = require('feedparser');
const url = 'http://rss.uol.com.br/feed/jogos.xml';
const axios = require("axios");
const iconv = require('iconv-lite');

function getNews(url, charset = 'utf-8') {
  return new Promise((success, fail) => {
    axios.request({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    }).then(result => {
      const output = iconv.decode(result.data, charset);
      const feedParser = new FeedParser();
      const newsItems = [];
      feedParser.on('readable', function () {
        // This is where the action is!
        const stream = this; // `this` is `feedparser`, which is a stream
        const meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
        let item;

        while (item = stream.read()) {
          newsItems.push({
            title: item.title,
            description: item.description.replace('Read more...','').replace('Read more...',''),
            link:item.link
          });
        }
        success(newsItems);
      });
      feedParser.write(output);
    })
  });
}

// getNews(url, 'ISO-8859-1').then(data => {
//   console.log(data)
// });

module.exports = getNews;
