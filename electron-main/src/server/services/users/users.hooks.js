const {authenticate} = require('@feathersjs/authentication').hooks;
const userReader = require('./user-reader');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      context => {
        if (context.arguments[0].user) {
          context.params.query = {
            _id: context.arguments[0].user._id,
            $limit: 1
          };
        }
      }
    ],
    get: [],
    create: [],
    update: [
      (context) => {
        context.id = context.params.user._id;
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      context => {
        if (context.result && context.result[0]) {
          context.result = context.result[0].origin ? context.result[0] : userReader.getUserIn(context.result[0]);
        }
      }
    ],
    get: [],
    create: [],
    update: [],
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
