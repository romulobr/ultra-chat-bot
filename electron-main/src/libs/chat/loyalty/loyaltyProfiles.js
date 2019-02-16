const urls = require('../../../urls');
const axios = require('axios');

module.exports = class LoyaltyProfiles {
  constructor(settings) {
    this.userId = settings.userId;
    this.jwt = settings.jwt;
    this.profiles = {};
    this.profilesByName = {};
    this.fetchProfiles().then(result => {
      this.intervalInMinutes = settings.intervalInMinutes || 5;
      result.data.profiles && result.data.profiles.forEach(profile => {
        this.profiles[profile.id] = profile;
        this.profilesByName[profile.name] = profile;
      });
      this.intervalId = setInterval(this.saveProfiles.bind(this), this.intervalInMinutes * 60000);
    }, (e) => {
      console.log('Could not fetch loyalty profiles', e);
      this.profiles = {};
      this.profilesByName = {};
    });
  }

  stop() {
    clearInterval(this.intervalId);
    this.saveProfiles();
  }

  async fetchProfiles() {
    return axios.get(urls.loyaltyProfileApi + `/${this.userId}`, {
      headers: {Authorization: 'Bearer ' + this.jwt}
    });
  }

  saveProfiles() {
    axios.patch(urls.loyaltyProfileApi + `/${this.userId}`,
      {profiles: Object.values(this.profiles)},
      {
        headers: {Authorization: 'Bearer ' + this.jwt}
      }).then(() => {
      console.log('loyalty profiles saved');
    }).catch(e => {
      if (e.response.status === 404) {
        axios.post(urls.loyaltyProfileApi,
          {
            profiles: Object.values(this.profiles),
            _id: this.userId
          },
          {
            headers: {Authorization: 'Bearer ' + this.jwt}
          }).then(() => {
          console.log('loyalty profiles created');
        });
      } else {
        console.log('failed to save profiles', e);
      }
    });
  }

  getUserProfile(id) {
    return this.profiles[id];
  }

  getUserProfileByName(name) {
    return this.profilesByName[name];
  }

  createUserProfile(user) {
    this.profiles[user.id] = user;
    this.profilesByName[user.name] = user;
  }

  addPoints(user, points) {
    console.log(`adding ${points.amount} ${points.type} to ${user.name}`);
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
