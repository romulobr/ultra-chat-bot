const {streamElements} = require('../../../server/stream-elements-api/stream-elements-api');
const {streamlabs} = require('../../../server/stream-labs-api/stream-labs-api');

// streamElements: true
// streamLabs: true
// defaultCost: "1"

async function verifyLoyalty(loyalty, message, user) {
  if (loyalty.streamElements && loyalty.defaultCost && loyalty.defaultCost != 0) {
    const pointsOk = await checkStreamElementsPoints(message.author, user, loyalty.defaultCost);
    if (!pointsOk) return false;
  }

  if (loyalty.streamlabs && loyalty.defaultCost && loyalty.defaultCost != 0) {
    const pointsOk = await checkStreamlabsPoints(message.author, user, loyalty.defaultCost);
    if (!pointsOk) return false;
  }
  return true;
}

async function checkStreamElementsPoints(author, user, defaultCost = 10) {
  try {
    const amount = defaultCost * -1;
    const fetch = await streamElements.fetchUserPoints(user.jwt, author.userName);
    if (fetch.data.points >= defaultCost) {
      streamElements.changeUserPoints(user.jwt, author.userName, amount);
      return true;
    }
  }
  catch (e) {
    return true;
  }
}

async function checkStreamlabsPoints(author, user, defaultCost = 10) {
  try {
    const pointsResponse = await streamlabs.fetchPoints(user.jwt, author.userName);
    const points = pointsResponse.data.points;
    if (points < defaultCost) {
      return false;
    }
    await streamlabs.subtractPoints(user.jwt, author.userName, defaultCost);
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
