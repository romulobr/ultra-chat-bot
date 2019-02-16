const LoyaltyProfiles = require('./loyaltyProfiles');

module.exports = class LoyaltySystem {
  constructor(settings) {
    this.loyaltyProfiles = new LoyaltyProfiles({jwt: settings.user.jwt, userId: settings.user.id});
  }

  getLoyaltyProfiles() {
    return this.loyaltyProfiles;
  }

  stop() {
    this.loyaltyProfiles.stop();
  }
};
