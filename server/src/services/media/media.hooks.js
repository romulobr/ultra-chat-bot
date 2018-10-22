const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      context => {
        if (context.arguments[0].user) {
          context.params.query = {
            ownerId: context.arguments[0].user._id,
            $limit: 1
          };
        }
      }
    ],
    get: [],
    create: [
      context => {
        //console.log(context.params.user);
        context.data.ownerId = context.params.user._id;
        //console.log('creating media data:', context.data);
      }
    ],
    update: [
      context => {
        //console.log(context.params.user);
        context.data.ownerId = context.params.user._id;
        //console.log('creating media data:', context.data);
      }
    ],
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
