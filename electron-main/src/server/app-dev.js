const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketIoMessenger = require('./socket-io/socket-io-messenger');
const streamElements = require('./stream-elements-api/stream-elements-api');
const youtubeApi = require('./youtube-api/youtube-api');
//const bodyParser = require('body-parser');

const {app} = require('electron');

const request = require('request');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mediaFolder = app.getPath('documents') + '/v3-media';

const corsOptions = {
  credentials: true, // This is important.
  origin: 'http://localhost:3002'
};

const api = express(feathers())
  .configure(configuration())
  .configure(express.rest())
  .configure(middleware)
  .configure(authentication)
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .configure(services)
  .configure(channels)
  .hooks(appHooks)
  .use(helmet())
  .use(cors(corsOptions))
  .use(compress());

const mainApp = express().use('/api', api);

mainApp.use(express.json());
mainApp.use(express.urlencoded({extended: false}));
mainApp.use(compress());

mainApp.use('/media', express.static(mediaFolder));

const server = mainApp.listen(62619);
socketIoMessenger.initialize(server, mainApp);
streamElements.initialize(mainApp);
youtubeApi.initialize(mainApp);

mainApp.use('*', function (req, res) {
  const newUrl = 'http://localhost:3001' + req.baseUrl;
  request(newUrl).pipe(res);
});


mainApp.use(express.notFound());
mainApp.use(express.errorHandler({logger}));

api.setup(server);

module.exports = api;
