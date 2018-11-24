const {streamElements} = require('../../../server/stream-elements-api/stream-elements-api');
const {streamlabs} = require('../../../server/stream-labs-api/stream-labs-api');

// streamElements: true
// streamLabs: true
// defaultCost: "1"
let streamElementsIntegrationFailed = false;
let streamlabsIntegrationFailed = false;

async function verifyLoyalty(loyalty, message) {
  if (loyalty.streamElements && loyalty.defaultCost && loyalty.defaultCost != 0) {
    const pointsOk = await checkStreamElementsPoints(message.author, loyalty.defaultCost);
    if (!pointsOk) return false;
  }

  if (this.settings.enableStreamlabsIntegration && loyalty.defaultCost && loyalty.defaultCost != 0) {
    const pointsOk = await checkStreamlabsPoints(message.author);
    if (!pointsOk) return false;
  }
  return true;
}

async function checkStreamElementsPoints(author, defaultCost = 10) {
  if (streamElementsIntegrationFailed || defaultCost === 0) {
    return true;
  }
  try {
    const amount = defaultCost * -1;
    const fetch = await streamElements.fetchUserPoints(this.user.jwt, author.userName);
    if (fetch.data.points >= defaultCost) {
      streamElements.changeUserPoints(this.settings.user.jwt, author.userName, amount);
      return true;
    }
  }
  catch (e) {
    streamElementsIntegrationFailed = true;
    return true;
  }
}

async function checkStreamlabsPoints(author, defaultCost = 10) {
  if (streamlabsIntegrationFailed || defaultCost === 0) {
    return true;
  }
  try {
    const pointsResponse = await streamlabs.fetchPoints(this.settings.user.jwt, author.userName);
    const points = pointsResponse.data.points;
    if (points < defaultCost) {
      return false;
    }
    await streamlabs.subtractPoints(this.settings.user.jwt, author.userName, defaultCost);
    return true;
  }
  catch (e) {
    if (e.message === 'User does not have enough points') {
      return false;
    }
    streamElementsIntegrationFailed = true;
    return true;
  }
}


module.exports = {verifyLoyalty};
