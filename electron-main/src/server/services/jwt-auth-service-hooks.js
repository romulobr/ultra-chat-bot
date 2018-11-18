// const userReader = require('../users/user-reader');
const { authenticate } = require('@feathersjs/authentication').hooks;

function addUserToQuery(context) {
  if (context.params.user) {
    // const user = userReader.getUserIn(context.params.user);
    context.params.query = {
      _id: context.params.user._id,
      $limit: 1
    };
    context.params.mongodb = {upsert:true};
  }
}

function adduserIdToData(context) {
  // const user = userReader.getUserIn(context.params.user);
  context.data._id = context.params.user._id;
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [addUserToQuery],
    get: [addUserToQuery],
    create: [adduserIdToData],
    update: [(context)=>{
      // const user = userReader.getUserIn(context.params.user);
      context.id=context.params.user._id;
    }],
    patch: [],
    remove: [
      (context)=>{
        context.id=context.params.user._id;
      }
    ]
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
