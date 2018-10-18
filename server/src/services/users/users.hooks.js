const { authenticate } = require('@feathersjs/authentication').hooks;



module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'),(context)=>{
      if(context.arguments[0].user){
        context.params.query={_id:context.arguments[0].user._id,$limit:1};
      }    
    } ],
    get: [ authenticate('jwt') ],
    create: [  ],
    update: [  authenticate('jwt') ],
    patch: [  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
    ],
    find: [(context)=>{
      const filteredData = context.result.data[0];
      delete filteredData.twitch.accessToken;
      delete filteredData.twitch.refreshToken;
      context.result = filteredData;
    }],
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
