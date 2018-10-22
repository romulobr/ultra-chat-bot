const { authenticate } = require('@feathersjs/authentication').hooks;

function addUserToQuery(context) {
  if (context.arguments[0].user) {
    context.params.query = {
      ownerId: context.arguments[0].user._id,
      $limit: 1
    };
  }
}

function adduserIdToData(context) {
  context.data.ownerId = context.params.user._id;
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [addUserToQuery],
    get: [addUserToQuery],
    create: [adduserIdToData],
    update: [adduserIdToData],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
