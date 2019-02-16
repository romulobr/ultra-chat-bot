const {CoolDownManager} = require('../util/cool-down-manager');
const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const permissionVerifier = require('../util/permission-verifier');
const ActivityCounter = require('./activity-counter');

module.exports = class LoyaltyChatApp {
  constructor(settings) {
    console.log('creating loyalty chat app');
    this.loyaltyProfiles = settings.loyaltySystem.getLoyaltyProfiles();
    this.pointsPerRound = settings.pointsPerRound || 1;
    const loyaltyProfiles = this.loyaltyProfiles;
    const pointsPerRound = this.pointsPerRound;

    function endRoundCallBack(activeUsers) {
      activeUsers.forEach(user => {
        loyaltyProfiles.addPoints(user, {type: 'power', amount: pointsPerRound});
      });
    }

    this.activityCounter = new ActivityCounter({roundDuration: settings.roundDuration, endRoundCallBack});
  }

  async handleMessage(message) {
    this.activityCounter.addActivity(message.author);

    // if (!permissionVerifier.verifyPermissions(this.settings.permissions, message)) return;
    // if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    // if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    const command = commands.commandInFirstWord(message.text, ['power', 'love', 'me']);
    const splitMessage = message.text.split(' ');
    const targetName = splitMessage[1] && splitMessage[1].replace('@', '');
    const amount = Number.parseInt(splitMessage[2]);

    if (!command) return;

    if (command.command && !targetName) {
      const profile = this.loyaltyProfiles.getUserProfile(message.author.id);
      this.say(`@${message.author.name}: ${(profile && profile.power) || 0}⚡ ${(profile && profile.love) || 0}💖`);

    } else if (command.command === 'love' && targetName && amount && amount > 0) {
      const sourceProfile = this.loyaltyProfiles.getUserProfile(message.author.id);
      const targetProfile = this.loyaltyProfiles.getUserProfileByName(targetName);
      if (sourceProfile && targetProfile && (sourceProfile !== targetProfile)) {
        if (sourceProfile.power >= amount) {
          sourceProfile.power = (targetProfile.power || 0) - amount;
          targetProfile.love = (targetProfile.love || 0) + amount;
        }
        this.say(`@${sourceProfile.name} ${amount}💕 @${targetProfile.name || 0}`);
      }
    }
  }

  stop() {
    this.activityCounter.stop();
  }
};
