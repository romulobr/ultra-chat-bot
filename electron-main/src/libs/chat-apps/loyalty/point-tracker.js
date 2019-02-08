const urls = require('../../../urls');
const axios = require('axios');

module.exports = class PointTracker {
  constructor(settings) {
    this.jwt = settings.jwt;
  }

  async getAllPoints() {
    return axios.get(urls.loyaltyProfileApi, {
      headers: {Authorization: 'Bearer ' + this.jwt}
    });
  }

  async getUserPoints(id) {
    return axios.get(`${urls.loyaltyProfileApi}/${id}`, {
      headers: {Authorization: 'Bearer ' + this.jwt}
    });
  }

  addPointsTo(users, points) {
    const userPointsPromises = users.map(user => {
      axios.patch(urls.loyaltyProfileApi,
        {
          id: user.id,
          points: points
        },
        {
          headers: {Authorization: 'Bearer ' + this.jwt}
        });
    });
  }
};
