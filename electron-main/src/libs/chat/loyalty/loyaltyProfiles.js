const urls = require('../../../urls');
const axios = require('axios');

module.exports = class LoyaltyProfiles {
  constructor(settings) {
    this.jwt = settings.jwt;
    this.fetchProfiles().then(result => {
      this.profiles = {};
      result.forEach(result => {
        this.profiles[result.id] = result;
      });
    });
  }

  async fetchProfiles() {
    return axios.get(urls.loyaltyProfileApi, {
      headers: {Authorization: 'Bearer ' + this.jwt}
    });
  }

  getUserProfile(id) {
    return this.profiles[id];
  }

  createUserProfile(user) {
    this.profiles[user.id] = user;
  }

  addPoints(user, points) {
    if (!this.profiles[user.id]) {
      this.createUserProfile(user)
    }
    const profile = this.profiles[user.id];
    profile[points.type] = (profile[points.type] || 0) + points.amount;
  }

  reducePoints(user, points) {
    this.addPoints(user, {...points, amount: points.amount * -1});
  }
};
