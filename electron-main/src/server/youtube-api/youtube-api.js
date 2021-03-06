const axios = require('axios');
const userApi = require('../../urls').userApi;
const youtubeClient = require('../../libs/youtube/youtube-client');

async function getUserBroadcasts(localToken) {
  const localUserResult = await axios.get(userApi, {headers: {Authorization: 'Bearer ' + localToken}});
  if (localUserResult.data && localUserResult.data.youtube) {
    const client = youtubeClient.oAuthClientWith(localUserResult.data.youtube.accessToken, localUserResult.data.youtube.refreshToken);
    return await youtubeClient.getBroadcasts(client);
  }
  return [];
}

function initialize(app) {
  app.get('/youtube-broadcasts', function (req, res) {
    try {
      const localToken = req.headers.authorization.split('Bearer ')[1];
      getUserBroadcasts(localToken).then(result => {
        res.send(result);
      }).catch(e => {
        console.log('e2', e);
        res.error(e);
      });
    } catch (e) {
      console.log('e1', e);
      res.error(e);
    }
  });
}

module.exports = {initialize};
