// enabled: true
// simpleCommands: true
// allowNormalUsers: true
// allowVips: true
// allowModerators: true
// allowSubscribersMembers: true

class CoolDownManager {

  constructor(cooldown) {
    this.blockedByCooldown = {global: false};
    this.cooldown = cooldown;
  }

  isBlockedByGlobalCoolDown() {
    return this.blockedByCooldown.global;
  }

  isAuthorBlockedByCoolDown(author) {
    return !!this.blockedByCooldown[author.userName];
  }

  removeCoolDownFrom(author) {
    delete this.blockedByCooldown[author.userName];
  }

  removeGlobalCoolDown() {
    this.blockedByCooldown.global = false;
  }


  addCoolDownTo(author) {
    if (this.cooldown.user &&
      !isNaN(this.cooldown.user) &&
      this.cooldown.user > 0) {
      this.blockedByCooldown[author.userName] = true;
      setTimeout(() => this.removeCoolDownFrom(author), this.cooldown.user * 1000)
    }

    if (this.cooldown.global &&
      !isNaN(this.cooldown.global) &&
      this.cooldown.global > 0) {
      this.blockedByCooldown.global = true;
      setTimeout(() => {
        this.removeGlobalCoolDown()
      }, this.cooldown.global * 1000)
    }
  }
}

module.exports = {CoolDownManager};
