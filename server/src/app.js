const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const {app} = require('electron');

const request = require('request');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mediaFolder = app.getPath('documents') + '/v3-media';

const expressApp = express(feathers());

// Load app configuration
expressApp.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
expressApp.use(helmet());
expressApp.use(cors());
expressApp.use(compress());
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: true}));
expressApp.use(favicon(path.join(expressApp.get('public'), 'favicon.ico')));
// Host the public folder
// app.use('/', express.static(app.get('public')));

expressApp.use('/media', express.static(mediaFolder));

// Set up Plugins and providers
expressApp.configure(express.rest());
expressApp.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
expressApp.configure(middleware);
expressApp.configure(authentication);
// Set up our services (see `services/index.js`)
expressApp.configure(services);
// Set up event channels (see channels.js)
expressApp.configure(channels);

// Configure a middleware for 404s and the error handler
expressApp.use('*', function (req, res) {
  //modify the url in any way you want
  var newurl = 'http://localhost:3001' + req.baseUrl;
  request(newurl).pipe(res);
});
expressApp.use(express.notFound());
expressApp.use(express.errorHandler({logger}));

expressApp.hooks(appHooks);

module.exports = expressApp;
