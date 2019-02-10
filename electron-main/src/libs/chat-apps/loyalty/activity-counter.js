module.exports = class ActivityCounter {
  constructor(settings) {
    this.roundDuration = settings.roundDuration || 5 * 60000;
    this.endRoundCallBack = settings.endRoundCallBack;
    this.startsRounds();
  }

  startsRounds() {
    if (this.roundsIntervalId) {
      clearInterval(this.roundsIntervalId);
    }
    this.roundsIntervalId = setInterval(this.startsRound, this.roundDuration)
  }

  startsRound() {
    if (this.activePeople && this.activePeople.length > 0) {
      this.endsRound();
    }
    this.activePeople = [];
  }

  endsRound() {
    console.log('ending round, active people:\n', this.activePeople);
    if (this.activePeople && this.activePeople.length > 0) {
      this.endRoundCallBack(this.activePeople);
    }
  }

  addActivity(user) {
    console.log('adding activity to user: ', user.id);
    this.activePeople[user.id] = user;
  }

  stop() {
    clearInterval(this.roundsIntervalId);
  }
};
