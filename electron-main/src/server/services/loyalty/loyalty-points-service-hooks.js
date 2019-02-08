const fs = require('fs');
const dataFolder = require('../../../folders').dataFolder;
const {authenticate} = require('@feathersjs/authentication').hooks;

function saveToFile(context) {
  //const filePath = `${dataFolder}/${context.path}.json`;
  //fs.writeFileSync(filePath, JSON.stringify(context.data));
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [saveToFile],
    update: [saveToFile],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
