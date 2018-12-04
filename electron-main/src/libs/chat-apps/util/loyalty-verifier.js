const {streamElements} = require('../../../server/stream-elements-api/stream-elements-api');
const {streamlabs} = require('../../../server/stream-labs-api/stream-labs-api');

async function verifyLoyalty(loyalty, message, user, itemCost) {
  const cost = itemCost || loyalty.defaultCost;

  if (loyalty.streamElements && cost && cost !== 0) {
    const pointsOk = await checkStreamElementsPoints(message.author, user, cost);
    if (!pointsOk) return false;
  }

  if (loyalty.streamlabs && cost && cost !== 0) {
    const pointsOk = await checkStreamlabsPoints(message.author, user, cost);
    if (!pointsOk) return false;
  }
  return true;
}

async function checkStreamElementsPoints(author, user, cost = 10) {
  try {
    const amount = cost * -1;
    const fetch = await streamElements.fetchUserPoints(user.jwt, author.userName);
    if (fetch.data.points >= cost) {
      streamElements.changeUserPoints(user.jwt, author.userName, amount);
      return true;
    }
  }
  catch (e) {
    return true;
  }
}

async function checkStreamlabsPoints(author, user, cost = 10) {
  try {
    const pointsResponse = await streamlabs.fetchPoints(user.jwt, author.userName);
    const points = pointsResponse.data.points;
    if (points < cost) {
      return false;
    }
    streamlabs.subtractPoints(user.jwt, author.userName, cost);
    return true;
  }
  catch (e) {
    if (e.message === 'User does not have enough points') {
      return false;
    }
    return true;
  }
}

module.exports = {verifyLoyalty};
