const axios = require('axios');
const streamLabsTokenApi = require('../../urls').streamLabsTokenApi;
const userApi = require('../../urls').userApi;
const streamLabsUserApiUrl = 'https://api.streamLabs.com/kappa/v2/users/current';
const streamLabsPointsApiUrl = 'https://api.streamLabs.com/kappa/v2/points';
let localUserResult;
let streamLabsTokenResult;
let streamLabsUserResult;

async function fetchUserPoints(localToken, userName) {
  streamLabsTokenResult = await axios.get(streamLabsTokenApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamLabsToken = streamLabsTokenResult.data[0].token;
  streamLabsUserResult = await axios.get(streamLabsUserApiUrl, {headers: {Authorization: 'Bearer ' + streamLabsToken}});
  let streamLabsChannel;
  if (streamLabsUserResult.data.channels.length === 1) {
    streamLabsChannel = streamLabsUserResult.data.channels[0]._id;
  } else {
    localUserResult = await axios.get(userApi, {headers: {Authorization: 'Bearer ' + localToken}});
    const userOrigin = localUserResult.data.origin;
    streamLabsChannel = streamLabsUserResult.data.channels.filter(channel => channel.provider === userOrigin)[0]._id;
  }
  const pointsUrl = `${streamLabsPointsApiUrl}/${streamLabsChannel}/${userName}`;
  return await axios.get(pointsUrl, {headers: {Authorization: 'Bearer ' + streamLabsToken}});
}

async function changeUserPoints(localToken, userName, amount) {
  streamLabsTokenResult = await axios.get(streamLabsTokenApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamLabsToken = streamLabsTokenResult.data[0].token;
  streamLabsUserResult = await axios.get(streamLabsUserApiUrl, {headers: {Authorization: 'Bearer ' + streamLabsToken}});
  let streamLabsChannel;
  if (streamLabsUserResult.data.channels.length === 1) {
    streamLabsChannel = streamLabsUserResult.data.channels[0]._id;
  } else {
    localUserResult =  await axios.get(userApi, {headers: {Authorization: 'Bearer ' + localToken}});
    const userOrigin = localUserResult.data.origin;
    streamLabsChannel = streamLabsUserResult.data.channels.filter(channel => channel.provider === userOrigin)[0]._id;
  }
  const pointsUrl = `${streamLabsPointsApiUrl}/${streamLabsChannel}/${userName}/${amount}`;
  return await axios.put(pointsUrl, {}, {headers: {Authorization: 'Bearer ' + streamLabsToken}});
}

function initialize(app) {
  app.get('/stream-elements/points/:user', function (req, res) {
    try {
      const localToken = req.headers.authorization.split('Bearer ')[1];
      fetchUserPoints(localToken, req.params.user).then(result => {
        res.send(result.data);
      }).catch(e => {
        res.error(e);
      });
    } catch (e) {
      res.error(e);
    }
  });
  app.put('/stream-elements/points/:user/:amount', function (req, res) {
    try {
      const localToken = req.headers.authorization.split('Bearer ')[1];
      changeUserPoints(localToken, req.params.user, req.params.amount).then(result => {
        res.send(result.data);
      }).catch(e => {
        res.error(e);
      });
    } catch (e) {
      res.error(e);
    }
  });

}

module.exports = {initialize, changeUserPoints, fetchUserPoints};
