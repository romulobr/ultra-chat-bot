const ChatApp = require("../../ChatApp");
const commands = require('../../util/command-in-text');
const axios = require('axios');
const welcomeMessagesApi = require('../../../../urls').welcomeMessagesApi;

class WelcomeChatApp extends ChatApp {

  setUp(settings) {
    this.jwt = settings.user.jwt;
    this.saveCommand = settings.options.saveCommand;
    this.showCommand = settings.options.showCommand;
  }

  async saveMessage(newMessage, id) {
    const welcomeMessage = await this.getMessage(id);
    if (welcomeMessage.data && welcomeMessage.data.length > 0) {
      welcomeMessage.data[0].message = newMessage;
      return axios.patch(welcomeMessagesApi, welcomeMessage.data[0], {headers: {Authorization: 'Bearer ' + this.jwt}});
    } else {
      return axios.post(welcomeMessagesApi, {
        message: newMessage,
        author: id
      }, {headers: {Authorization: 'Bearer ' + this.jwt}});
    }
  }

  getMessage(id) {
    return axios.get(`${welcomeMessagesApi}?author=${id}`, {headers: {Authorization: 'Bearer ' + this.jwt}});
  }

  async messageHandler(message) {
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
        this.sendScreenMessage(screenMessage);
      }
    }
  }
}

module.exports = WelcomeChatApp;
