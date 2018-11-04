const commandInText = require('../util/command-in-text');
const sendScreenMessage = require('../util/send-screen-message');
const urls = require('../../../urls');

class MediaPlayerChatApp {

    constructor(media) {
        this.media = media;
        this.commands = media.map(mediaItem => mediaItem.command.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    }

    handleMessage(message) {
        let command = commandInText(message.text, this.commands);
        if (command) {
            const mediaUrl = urls.media + '/' + this.media[command.index].url;
            const message = {media: mediaUrl};
            sendScreenMessage(message);
        }
    }
}

module.exports = MediaPlayerChatApp;
