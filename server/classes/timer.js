'use strict';

module.exports = class Timer {
  constructor(duration, io, room) {
    this.duration = duration;
    this.time = duration;
    this.io = io;
    this.room = room;
    this.interval = undefined;
  }

  start() {
    console.log('Starting timer');
    this.io.to(this.room).emit('time', {time: this.time, running: true});
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.time--;
    this.io.to(this.room).emit('time', {time: this.time, running: true});
    if (this.time === 0) this.stop();
  }

  stop() {
    console.log('Stopping timer');
    this.io.to(this.room).emit('time', {time: this.time, running: false});
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
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
