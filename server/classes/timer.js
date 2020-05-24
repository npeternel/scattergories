'use strict';

module.exports = class Timer {
  constructor(duration, io, room) {
    this.duration = duration;
    this.time = duration;
    this.io = io;
    this.room = room;
    this.interval = undefined;
  }

  curr() {
    // this.io.to(this.room).emit('time', {time: this.duration});
    return this.time;
  }

  start() {
    console.log('Starting timer');
    if (this.time === 0) this.reset();
    this.io.to(this.room).emit('time', {time: this.time, running: true});
    this.interval = setInterval(() => this.tick(), 1000);
  }

  change(newTime) {
    if (newTime <= 0) return;
    console.log(`Changing timer to ${newTime}`);
    this.duration = newTime;
    this.reset();
  }

  tick() {
    this.time--;
    this.io.to(this.room).emit('time', {time: this.time, running: true});
    if (this.time <= 0) this.end();
  }

  stop() {
    console.log('Stopping timer');
    this.io.to(this.room).emit('time', {time: this.time, running: false});
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  end() {
    console.log('Ending');
    this.stop();
    this.io.to(this.room).emit('time:end');
  }

  reset() {
    console.log('Resetting timer');
    this.time = this.duration;
    this.io.to(this.room).emit('time', {time: this.time, running: false});
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

}
