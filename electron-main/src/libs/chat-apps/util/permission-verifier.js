// enabled: true
// simpleCommands: true
// allowNormalUsers: true
// allowVips: true
// allowModerators: true
// allowSubscribersMembers: true

function verifyPermissions(permissions, message) {
  if (!permissions.enabled) {
    return false;
  }
  if (!permissions.simpleCommands && message.text[0] === '!') {
    return false;
  }
  if (!permissions.allowNormalUsers && !(message.author.isChatOwner || message.author.isChatModerator || message.author.isChatSponsor)) {
    return false;
  }
  if (!permissions.allowModerators && message.author.isChatModerator) {
    return false;
  }
  if (!permissions.allowSubscribersMembers && message.author.sponsor) {
    return false;
  }
  return true;
}

module.exports = {verifyPermissions};
