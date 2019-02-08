const PointTracker = require('./point-tracker');

module.exports = class ActivityCounter {
  constructor(settings, pointTracker = new PointTracker()) {
    this.roundDuration = settings.roundDuration || 5 * 60000;
    this.pointTracker = pointTracker;
    this.startsRounds();
  }

  startsRounds() {
    this.roundsIntervalId = setInterval(this.startsRound,)
  }

  startsRound() {
    if (this.activePeople && this.activePeople.length > 0) {
      this.endsRound();
    }
    this.activePeople = [];
  }

  endsRound() {
    this.pointTracker.addPointsTo(this.activePeople);
  }

  stop() {
    clearInterval(this.roundsIntervalId);
  }

};
