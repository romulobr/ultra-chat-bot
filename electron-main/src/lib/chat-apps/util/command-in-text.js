function cleanText(text) {
    const lowercaseText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return lowercaseText[0] === '!' ? lowercaseText.substring(1, lowercaseText.length - 1) : lowercaseText;
}

function commandInText(text, commands) {
    const commandIndex = commands.indexOf(cleanText(text));
    return commandIndex !== -1 ? {index: commandIndex, command: commands[commandIndex]} : null;
}

module.exports = commandInText;
