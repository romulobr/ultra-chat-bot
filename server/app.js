const authentication  = require('@feathersjs/authentication');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');

const MongoClient = require('mongodb').MongoClient;
const mongoService = require('feathers-mongodb');
const oauth2 = require('@feathersjs/authentication-oauth2');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const jwt = require('@feathersjs/authentication-jwt');

const twitchCredentials = require('./twitch-credentials');

// Create an Express compatible Feathers application instance.
const app = express(feathers());
// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({extended: true}));
// Enable REST services
app.configure(express.rest());


// Connect to the db, create and register a Feathers service.
// A basic error handler, just like Express
app.use(express.errorHandler());
// Connect to your MongoDB instance(s)
MongoClient.connect('mongodb://romulino:dev123@ds125381.mlab.com:25381/dev',{ useNewUrlParser: true })
  .then(function(client){
    // Set the model now that we are connected    
    app.use('/users', mongoService({
      Model: client.db('dev').collection('users')
    }));
    
    app.configure(authentication ({ secret: 'super fast' }));
    app.configure(jwt());
    
    
  app.configure(oauth2({
    name: 'twitch',
    Strategy: OAuth2Strategy,
    authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
    tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
    clientID: twitchCredentials.clientId,
    clientSecret: twitchCredentials.clientSecret,
    callbackURL: twitchCredentials.redirectUrl
  }));

  //   new TwitchTokenStrategy({
  //     clientID: twitchCredentials.clientId,
  //     clientSecret: twitchCredentials.clientSecret,
  //     passReqToCallback: true,
  //     authorizationParams: {
  //       access_type: 'offline'
  //     }
  // }, function(req, accessToken, refreshToken, profile, next) {
  //     service('/users').create({'twitch.id': profile.id}).then(()=>{next();});      
  // });
    // const strategy = new twitchStrategy({
    //   name:'twitch',
    //   clientID: twitchCredentials.clientId,
    //   clientSecret: twitchCredentials.clientSecret,
    //   callbackURL: twitchCredentials.redirectUrl,
    //   scope: twitchCredentials.scope,
    //   authorizationParams: {
    //     access_type: 'offline'
    //   }
    // },
    // function(accessToken, refreshToken, profile, done) {
    //   done();
    // });
  
    // app.passport.use(theStrategy);
 
    app.service('authentication').hooks({
      before: {
        create: [
          authentication.hooks.authenticate(['jwt'])
        ]
      }
    });


    
  }).catch(error => console.error(error));

// Start the server.
const port = 3030;

app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});