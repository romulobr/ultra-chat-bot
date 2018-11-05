/* eslint-disable no-console */
const path = require('path');
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config/');
const logger = require('./logger');
const app = require('./app-dev');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Application started', app.get('host'), port)
);
