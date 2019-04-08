const sendScreenMessage = require('./util/send-screen-message');
const {CoolDownManager} = require('./util/cool-down-manager');
const {verifyLoyalty} = require('./util/loyalty-verifier');
const permissionVerifier = require('./util/permission-verifier');

class ChatApp {
  constructor(settings) {
    console.log('creating chat app');
    this.setUp(settings);
  }

  setUp(settings) {
    console.log('setting up chat app');
    if (settings.cooldown) {
      this.cooldownManager = new CoolDownManager(settings.cooldown);
    }
    this.permissions = settings.permissions;
    this.source = settings.options && settings.options.source;
    this.customSource = settings.options && settings.options.customSource;
    this.options = settings.options;
    this.loyalty = settings.loyalty;
    this.user = settings.user;
    this.sendScreenMessage = sendScreenMessage;
  }

  sendScreenMessage(payload) {
    console.log('sending screen message');
    sendScreenMessage(payload, this.source && this.customSource)
  }

  permissionGranted(message) {
    if (this.permissions) {
      return permissionVerifier.verifyPermissions(this.permissions, message);
    }
    console.log('bypassed permissions check');
    return true;
  }

  isCoolDownOk(message) {
    if (this.cooldownManager) {
      return !(this.cooldownManager.isBlockedByGlobalCoolDown() || this.cooldownManager.isAuthorBlockedByCoolDown(message.author));
    }
    console.log('bypassed cooldown check');
    return true;
  }

  async verifyLoyalty(message) {
    if (this.loyalty) {
      return await verifyLoyalty(this.loyalty, message, this.user, message.loyaltyCost, this.loyaltyProfiles);
    }
    console.log('bypassed loyalty check');
    return true;
  }

  async handleMessage(originalMessage) {
    let preparedMessage = this.prepareMessage ? this.prepareMessage(originalMessage) : originalMessage;
    // console.log('checking if should handle preparedMessage ');
    // console.log('has message handler:', !!this.messageHandler);
    // console.log('cooldown check:', this.isCoolDownOk(preparedMessage));
    // console.log('permissions check:', this.permissionGranted(preparedMessage));
    let loyaltyVerified = true;

    if (preparedMessage.loyaltyCost) {
      loyaltyVerified = await this.verifyLoyalty(preparedMessage);
    }

    if (this.messageHandler && loyaltyVerified && this.isCoolDownOk(preparedMessage) && this.permissionGranted(preparedMessage)) {
      console.log('handling preparedMessage');
      this.messageHandler(preparedMessage);
    }
  }
}

module.exports = ChatApp;
