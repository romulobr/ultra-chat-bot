const LoyaltyProfiles = require('./loyaltyProfiles');

module.exports = class LoyaltySystem {
  constructor(settings) {
    this.loyaltyProfiles = new LoyaltyProfiles({jwt: settings.user.jwt});
  }

  getLoyaltyProfiles() {
    return this.loyaltyProfiles;
  }

};
