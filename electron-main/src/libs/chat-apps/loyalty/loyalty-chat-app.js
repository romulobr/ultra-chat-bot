const {CoolDownManager} = require('../util/cool-down-manager');
const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const permissionVerifier = require('../util/permission-verifier');
const ActivityCounter = require('./activity-counter');

module.exports = class LoyaltyChatApp {
  constructor(settings) {
    this.loyaltyProfiles = settings.loyaltySystem.getLoyaltyProfiles();
    this.pointsPerRound = settings.pointsPerRound || 5;

    function endRoundCallBack(activeUsers) {
      activeUsers.forEach(user => {
        this.loyaltyProfiles.addPoints(user, {type: 'power', amount: this.pointsPerRound})
      });
    }

    this.activityCounter = new ActivityCounter({roundDuration: settings.roundDuration, endRoundCallBack});
    this.activityCounter.startsRounds();
  }

  async handleMessage(message) {
    console.log(message.author);
    this.activityCounter.addActivity(message.author);
    if (!permissionVerifier.verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInFirstWord(message.text, [this.saveCommand, this.showCommand]);
    if (!command) return;

    if (command.command === this.saveCommand) {
      console.log('saving a welcome message');
      let welcomeMessage = message.text.replace(this.saveCommand, '');
      if (welcomeMessage[0] === '!') {
        welcomeMessage = welcomeMessage.substr(1, welcomeMessage.length - 1);
      }
      console.log('got the message:' + welcomeMessage + '\n\n\n');
      this.saveMessage(welcomeMessage, message.author.id);
    }
    else if (command.command === this.showCommand) {
      console.log('showing a welcome message');
      const authorWelcomeMessage = await this.getMessage(message.author.id);
      if (authorWelcomeMessage.data && authorWelcomeMessage.data.length > 0) {
        console.log('got a message to show:\n\n', authorWelcomeMessage.data[0], '\n\n');
        const screenMessage = {
          isWelcomeMessage: true,
          ...authorWelcomeMessage.data[0],
          author: message.author
        };
        sendScreenMessage(screenMessage, this.settings.options.source && this.settings.options.source.customSource);
      }
    }
  }

  stop() {
    this.activityCounter.stop();
  }
};
