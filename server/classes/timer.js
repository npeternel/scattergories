module.exports = class Timer {
  constructor(duration, io, room) {
    this.duration = duration;
    this.time = duration;
  }

  curr() {
    // this.io.to(this.room).emit('time', {time: this.duration});
    return this.time;
  }

  start() {
    return { time: this.time, running: true };
  }







  reset() {
    console.log('Resetting timer');
    this.time = this.duration;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    return { time: this.time, running: false };
  }
};
