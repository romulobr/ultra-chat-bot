const { authenticate } = require("@feathersjs/authentication").hooks;
const userReader = require("./user-reader");

module.exports = {
  before: {
    all: [],
    find: [
      authenticate("jwt"),
      context => {
        if (context.arguments[0].user) {
          context.params.query = {
            _id: context.arguments[0].user._id,
            $limit: 1
          };
        }
      }
    ],
    get: [authenticate("jwt")],
    create: [],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [],
    find: [
      context => {
        context.result = userReader.getUserIn(context.arguments[0].user);
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
