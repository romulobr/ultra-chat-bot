function cleanText(text) {
  const lowercaseText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return text[0] === '!' ? lowercaseText.substring(1, lowercaseText.length) : lowercaseText;
}

function commandInText(text, commands) {
  const commandIndex = commands.indexOf(cleanText(text));
  return commandIndex !== -1 ? {index: commandIndex, command: commands[commandIndex]} : null;
}

function commandInFirstWord(text, commands) {
  const commandIndex = commands.indexOf(cleanText(text).split(' ')[0]);
  return commandIndex !== -1 ? {index: commandIndex, command: commands[commandIndex]} : null;
}

module.exports = {commandInText, commandInFirstWord};
