const {CoolDownManager} = require('../util/cool-down-manager');
const commands = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const permissionVerifier = require('../util/permission-verifier');
const axios = require('axios');
const welcomeMessagesApi = require('../../../urls').welcomeMessagesApi;

class WelcomeChatApp {

  constructor(settings) {
    this.settings = settings;
    this.cooldownManager = new CoolDownManager(this.settings.options.cooldown);
  }

  async saveMessage(newMessage, id) {
    const welcomeMessage = await this.getMessage(id);
    if (welcomeMessage.data && welcomeMessage.data.length > 0) {
      welcomeMessage.data[0].message = newMessage;
      return axios.patch(welcomeMessagesApi, welcomeMessage.data[0], {headers: {Authorization: 'Bearer ' + this.settings.user.jwt}});
    } else {
      return axios.post(welcomeMessagesApi, {
        message: newMessage,
        author: id
      }, {headers: {Authorization: 'Bearer ' + this.settings.user.jwt}});
    }
  }

  getMessage(id) {
    return axios.get(`${welcomeMessagesApi}?author=${id}`, {headers: {Authorization: 'Bearer ' + this.settings.user.jwt}});
  }

  async handleMessage(message) {
    if (!permissionVerifier.verifyPermissions(this.settings.permissions, message)) return;
    if (this.cooldownManager.isBlockedByGlobalCoolDown()) return;
    if (this.cooldownManager.isAuthorBlockedByCoolDown(message.author)) return;

    let command = commands.commandInFirstWord(message.text, [this.settings.options.saveCommand, this.settings.options.showCommand]);
    if (!command) return;

    if (command.command === this.settings.options.saveCommand) {
      console.log('saving a welcome message');
      let welcomeMessage = message.text.replace(this.settings.options.saveCommand, '');
      if (welcomeMessage[0] === '!') {
        welcomeMessage = welcomeMessage.substr(1, welcomeMessage.length - 1);
      }
      console.log('got the message:' + welcomeMessage + '\n\n\n');
      this.saveMessage(welcomeMessage, message.author.id);
    }
    else if (command.command === this.settings.options.showCommand) {
      console.log('showing a welcome message');
      const authorWelcomeMessage = await this.getMessage(message.author.id);
      if (authorWelcomeMessage.data && authorWelcomeMessage.data.length > 0) {
        console.log('got a message to show:\n\n', authorWelcomeMessage.data[0], '\n\n');
        const screenMessage = {
          isWelcomeMessage: true,
          ...authorWelcomeMessage.data[0],
          author:message.author
        };
        sendScreenMessage(screenMessage, this.settings.options.source.customSource);
      }
    }
  }
}

module.exports = WelcomeChatApp;
