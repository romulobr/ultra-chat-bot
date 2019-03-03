const {CoolDownManager} = require('../util/cool-down-manager');
const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const permissionVerifier = require('../util/permission-verifier');
const ActivityCounter = require('./activity-counter');
const urls = require('../../../urls');
const mediaUrl = require('../../../urls').media;

function simpleUrlOrMediaUrl(setting) {
  return (setting && (setting.includes('http://') || setting.includes('https://'))) ?
    setting : `${mediaUrl}/${setting}`
}

module.exports = class LoyaltyChatApp {
  constructor(settings) {
    console.log('creating loyalty chat app');
    this.loyaltyProfiles = settings.loyaltySystem.getLoyaltyProfiles();
    this.pointsPerRound = (Number.parseInt(settings.options.pointsPerRound)) || 1;
    this.subscriberMultiplier = (Number.parseFloat(settings.options.subscriberMultiplier)) || 2;
    const subscriberMultiplier = this.subscriberMultiplier;
    this.source = settings.options.source;
    this.customSource = settings.options.customSource;

    this.permissions = settings.permissions;

    this.enableSound = settings.options.enableSound;
    this.sound = simpleUrlOrMediaUrl(settings.options.sound);
    this.icon = simpleUrlOrMediaUrl(settings.options.icon);
    this.showIcon = settings.options.showIcon;

    const loyaltyProfiles = this.loyaltyProfiles;
    const pointsPerRound = Number.parseInt(this.pointsPerRound) || 1;

    this.cooldownManager = new CoolDownManager(settings.options.cooldown);

    function endRoundCallBack(activeUsers) {
      activeUsers.forEach(user => {
        const amount = (user.isChatSponsor || user.isChatOwner) ? pointsPerRound * subscriberMultiplier : pointsPerRound;
        loyaltyProfiles.addPoints(user, {type: 'power', amount});
        loyaltyProfiles.addPoints(user, {type: 'xp', amount});
      });
    }

    this.activityCounter = new ActivityCounter({
      roundDurationInMinutes: settings.options.roundDurationInMinutes,
      endRoundCallBack
    });

  }

  sendAudioMessage() {
    const screenAudioMessage = {
      isMedia: true,
      url: urls.media + '/' + this.sound
    };
    sendScreenMessage(screenAudioMessage, this.source && this.customSource);
  }

  sendIconMessages(amount) {
    const limit = amount < 500 ? amount : 500;
    const iconMessage = {isIcons: true, icon: this.icon};
    let i;
    for (i = 0; i < limit; i++) {
      sendScreenMessage(iconMessage, this.source && this.customSource);
    }
  }

  async handleMessage(message) {
    this.activityCounter.addActivity(message.author);

    if (!permissionVerifier.verifyPermissions(this.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    const command = commands.commandInFirstWord(message.text, ['power', 'love', 'me']);
    if (!command) return;

    if (command.command === message.text) {
      const profile = this.loyaltyProfiles.getUserProfile(message.author.id);
      this.say(`@${message.author.name} ${(profile && profile.love) || 0}💖 ${(profile && profile.power) || 0}⚡ ${(profile && profile.xp) || 0}🎖`);

    } else if (command.command === 'love') {
      const parsedMessage = /!?(\w*) (\d*) (@?.*)/.exec(message.text);
      let amount = parsedMessage && parsedMessage[2];
      amount = Number.parseInt(amount);
      let targetName = parsedMessage && parsedMessage[3];
      targetName = targetName.replace('@', '');

      if (!targetName || !amount || amount <= 0) return;

      const sourceProfile = this.loyaltyProfiles.getUserProfile(message.author.id);
      const targetProfile = this.loyaltyProfiles.getUserProfileByName(targetName);
      if (sourceProfile && targetProfile && (sourceProfile !== targetProfile)) {
        if (Number.parseInt(sourceProfile.power) - amount >= 0) {
          this.loyaltyProfiles.reducePoints(sourceProfile, {type: 'power', amount});
          this.loyaltyProfiles.addPoints(targetProfile, {type: 'love', amount});
          this.say(`@${sourceProfile.name} ${amount}💝 @${targetProfile.name || 0}`);
          if (this.enableSound && this.sound) {
            this.sendAudioMessage();
          }
          if (this.showIcon && this.icon) {
            this.sendIconMessages(amount);
          }
        }
      }
    }
  }

  stop() {
    this.activityCounter.stop();
  }
};
