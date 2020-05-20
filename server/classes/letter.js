'use strict';

// omitting: Q, X, V, Y, Z
const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'R',
  'S',
  'T',
  'U',
  'W'
];

module.exports = class Letter {
  constructor(io, room) {
    this.unused = this.initialize();
    this.io = io;
    this.room = room;
    // this.letter = shuffled[0];
  }

  initialize() {
    let duplicates = true;
    let shuffled;
    while (duplicates) {
      shuffled = this.shuffleLetters();
      if (this.unused === undefined) duplicates = false;
      else if (shuffled[0] !== this.unused[0]) duplicates = false;
    }
    return shuffled;
  }

  shuffleLetters() {
    const array = [...letters];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  curr() {
    this.io.to(this.room).emit('letter', {letter: this.unused[0]});
  }

  next() {
    if (this.unused) {
      this.unused = this.unused.slice(1);
    } else {
      this.unused = this.shuffleLetters();
    }
    this.io.to(this.room).emit('letter', {letter: this.unused[0]});
  }

}