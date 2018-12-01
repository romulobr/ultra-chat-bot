const axios = require('axios');
const streamLabsDataApi = require('../../urls').streamlabsDataApi;
const userApi = require('../../urls').userApi;
const config = require('../config/default.json').authentication.streamlabs;
const streamLabsPointsApiUrl = 'https://streamlabs.com/api/v1.0/points/subtract';

function getChannel(user, origin) {
  if(user.data.origin==='twitch'){
    return user.data.twitch.name;
  }
  if(user.data.origin==='youtube'){
    return user.data.youtube.name;
  }
  if(user.data.origin==='multi'){
    return user.data[origin].name;
  }
}

async function fetchPoints(localToken, userName, origin = 'twitch') {
  const streamLabsTokenResult = await axios.get(streamLabsDataApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamLabsToken = streamLabsTokenResult.data[0].access_token;
  const localUserResult = await axios.get(userApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const channel = getChannel(localUserResult, origin);
  const url = `https://streamlabs.com/api/v1.0/points?access_token=${streamLabsToken}&username=${userName}&channel=${channel}`;
  return await axios.get(url);
}

async function subtractPoints(localToken, userName, amount, origin = 'twitch') {
  const streamLabsTokenResult = await axios.get(streamLabsDataApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamLabsToken = streamLabsTokenResult.data[0].access_token;
  const localUserResult = await axios.get(userApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const channel = getChannel(localUserResult, origin);
  return await axios.post(streamLabsPointsApiUrl, {
    username: userName,
    channel: channel,
    points: amount,
    access_token: streamLabsToken
  });
}

async function getToken(code, localUserToken) {
  const url = 'https://streamlabs.com/api/v1.0/token';
  const streamlabsResponse = await axios.post(url, {
    grant_type: 'authorization_code',
    client_id: config.clientID,
    client_secret: config.clientSecret,
    redirect_uri: config.callbackURL,
    code: code
  });
  try {
    return await axios.put(streamLabsDataApi, streamlabsResponse.data, {headers: {Authorization: `Bearer ${localUserToken}`}});
  } catch (e) {
    return e;
  }
}

function initialize(app) {
  app.get('/streamlabs/authorize', (req, res) => {
    const url = `https://streamlabs.com/api/v1.0/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${config.callbackURL}&scope=${config.scope[0]}`;
    res.redirect(url);
  });

  app.get('/streamlabs/callback', (req, res) => {
    try {

      getToken(req.query.code, req.headers.cookie.replace('feathers-jwt=', '')).then(() => {
        res.redirect('/auth-success');
      });
    } catch (e) {
      return e;
    }
  });
}

module.exports = {initialize, streamlabs: {subtractPoints, fetchPoints}};
