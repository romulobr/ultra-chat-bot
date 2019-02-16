module.exports = class ActivityCounter {
  constructor(settings) {
    this.roundDuration = settings.roundDuration || 10000;
    this.endRoundCallBack = settings.endRoundCallBack;
    this.activePeople = {};
    this.startsRounds();
  }

  startsRounds() {
    console.log(`starting rounds with ${this.roundDuration} duration`);
    if (this.roundsIntervalId) {
      clearInterval(this.roundsIntervalId);
    }
    this.startsRound();
    this.roundsIntervalId = setInterval(this.startsRound.bind(this), this.roundDuration);
  }

  startsRound() {
    console.log('starting round');
    if (this.activePeople.changed) {
      this.endsRound();
    }
  }

  endsRound() {
    console.log('ending round');
    if (this.activePeople.changed) {
      delete this.activePeople.changed;
      this.endRoundCallBack(Object.values(this.activePeople));
      this.activePeople = {};
    }
  }

  addActivity(user) {
    console.log('adding activity to user: ', user.id);
    this.activePeople.changed = true;
    this.activePeople[user.id] = user;
  }

  stop() {
    console.log('stopping activity counter');
    clearInterval(this.roundsIntervalId);
  }
};
