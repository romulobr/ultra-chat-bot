const axios = require('axios');
const streamElementsTokenApi = require('../../urls').streamElementsTokenApi;
const streamElementsUserApiUrl = 'https://api.streamelements.com/kappa/v2/users/current';
const streamElementsPointsApiUrl = 'https://api.streamelements.com/kappa/v2/points';

let streamElementsTokenResult;
let streamElementsUserResult;

async function fetchUserPoints(localToken, userName, origin = 'twitch') {
  streamElementsTokenResult = await axios.get(streamElementsTokenApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamElementsToken = streamElementsTokenResult.data[0].token;
  streamElementsUserResult = await axios.get(streamElementsUserApiUrl, {headers: {Authorization: 'Bearer ' + streamElementsToken}});
  let streamElementsChannel;
  if (streamElementsUserResult.data.channels.length === 1) {
    streamElementsChannel = streamElementsUserResult.data.channels[0]._id;
  } else {
    streamElementsChannel = streamElementsUserResult.data.channels.filter(channel => channel.provider === origin)[0]._id;
  }
  const pointsUrl = `${streamElementsPointsApiUrl}/${streamElementsChannel}/${userName}`;
  return await axios.get(pointsUrl, {headers: {Authorization: 'Bearer ' + streamElementsToken}});
}

async function changeUserPoints(localToken, userName, amount, origin = 'twitch') {
  streamElementsTokenResult = await axios.get(streamElementsTokenApi, {headers: {Authorization: 'Bearer ' + localToken}});
  const streamElementsToken = streamElementsTokenResult.data[0].token;
  streamElementsUserResult = await axios.get(streamElementsUserApiUrl, {headers: {Authorization: 'Bearer ' + streamElementsToken}});
  let streamElementsChannel;
  if (streamElementsUserResult.data.channels.length === 1) {
    streamElementsChannel = streamElementsUserResult.data.channels[0]._id;
  } else {
    streamElementsChannel = streamElementsUserResult.data.channels.filter(channel => channel.provider === origin)[0]._id;
  }
  const pointsUrl = `${streamElementsPointsApiUrl}/${streamElementsChannel}/${userName}/${amount}`;
  return await axios.put(pointsUrl, {}, {headers: {Authorization: 'Bearer ' + streamElementsToken}});
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

module.exports = {initialize, streamElements: {changeUserPoints, fetchUserPoints}};
