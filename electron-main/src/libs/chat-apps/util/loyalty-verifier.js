const {streamElements} = require('../../../server/stream-elements-api/stream-elements-api');
const {streamlabs} = require('../../../server/stream-labs-api/stream-labs-api');

// streamElements: true
// streamLabs: true
// defaultCost: "1"
async function verifyLoyalty(loyalty, message) {
  if (loyalty.streamElements) {
    const pointsOk = await checkStreamElementsPoints(message.author);
    if (!pointsOk) return false;
  }

  if (this.settings.enableStreamlabsIntegration) {
    const pointsOk = await checkStreamlabsPoints(message.author);
    if (!pointsOk) return false;
  }
  return true;
}

async function checkStreamElementsPoints(author) {
  if (this.streamElementsIntegrationFailed || this.settings.costPerChatPlay === 0) {
    return true;
  }
  try {
    const amount = this.settings.costPerChatPlay * -1;
    const fetch = await streamElements.fetchUserPoints(this.user.jwt, author.userName);
    if (fetch.data.points >= this.settings.costPerChatPlay) {
      streamElements.changeUserPoints(this.settings.user.jwt, author.userName, amount);
      return true;
    }
  }
  catch (e) {
    this.streamElementsIntegrationFailed = true;
    return true;
  }
}

async function checkStreamlabsPoints(author) {
  if (this.streamlabsIntegrationFailed || this.settings.costPerChatPlay === 0) {
    return true;
  }
  try {
    const pointsResponse = await streamlabs.fetchPoints(this.settings.user.jwt, author.userName);
    const points = pointsResponse.data.points;
    if (points < this.settings.costPerChatPlay) {
      return false;
    }
    await streamlabs.subtractPoints(this.settings.user.jwt, author.userName, this.settings.costPerChatPlay);
    return true;
  }
  catch (e) {
    if (e.message === 'User does not have enough points') {
      return false;
    }
    this.streamElementsIntegrationFailed = true;
    return true;
  }
}


module.exports = {verifyLoyalty};
