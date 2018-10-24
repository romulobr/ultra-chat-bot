const { authenticate } = require('@feathersjs/authentication').hooks;

function addUserToQuery(context) {
  if (context.arguments[0].user) {
    context.params.query = {
      _id: context.arguments[0].user._id,
      $limit: 1
    };
    context.params.mongodb = {upsert:true};
  }
}

function adduserIdToData(context) {
  context.data._id = context.params.user._id;
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [addUserToQuery],
    get: [addUserToQuery],
    create: [adduserIdToData,addUserToQuery],
    update: [(context)=>{
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
