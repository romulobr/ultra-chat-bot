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

    this.source = settings.options.source;
    this.customSource = settings.options.customSource;

    this.permissions = settings.permissions;

    this.enableSound = settings.options.enableSound;
    this.sound = simpleUrlOrMediaUrl(settings.options.sound);
    this.icon = simpleUrlOrMediaUrl(settings.options.icon);
    this.showIcon = settings.options.showIcon;

    const loyaltyProfiles = this.loyaltyProfiles;
    const pointsPerRound = this.pointsPerRound;

    this.cooldownManager = new CoolDownManager(settings.options.cooldown);

    function endRoundCallBack(activeUsers) {
      activeUsers.forEach(user => {
        loyaltyProfiles.addPoints(user, {type: 'power', amount: pointsPerRound});
      });
    }

    this.activityCounter = new ActivityCounter({roundDuration: settings.roundDuration, endRoundCallBack});

  }

  sendAudioMessage() {
    const screenAudioMessage = {
      isMedia: true,
      url: urls.media + '/' + this.sound
    };
    sendScreenMessage(screenAudioMessage, this.source && this.customSource);
  }

  sendIconMessages(amount) {
    const iconMessage = {isIcons: true, icon: this.icon};
    let i;
    for (i = 0; i < amount; i++) {
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
    const parsedMessage = /!?(\w*) (\d*) (@?.*)/.exec(message.text);

    const amount = parsedMessage && parsedMessage[2];
    let targetName = parsedMessage && parsedMessage[3];

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
        if (this.enableSound && this.sound) {
          this.sendAudioMessage();
        }
        if (this.showIcon && this.icon) {
          this.sendIconMessages(amount);
        }
      }
    }
  }

  stop() {
    this.activityCounter.stop();
  }
};
