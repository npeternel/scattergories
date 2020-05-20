'use strict';

const letters = require('../data/letters.json');

module.exports = class Letter {
  constructor(io, room) {
    this.letters = this.newLetters();
    this.io = io;
    this.room = room;
    this.last = '';
  }

  newLetters() {
    let sameAsLast = true;
    let shuffled;
    while (sameAsLast) {
      shuffled = this.shuffleLetters();
      if (!this.last || (this.last && shuffled[0] !== this.last)) sameAsLast = false;
    }
    this.last = '';
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
    if (!this.letters || this.letters.length === 0) {
      this.letters = this.newLetters();
    }
    this.io.to(this.room).emit('letter', {letter: this.letters[0]});
  }

  next() {
    console.log(this.letters);
    if (!this.letters || this.letters.length === 0) {
      this.letters = this.newLetters();
    }
    this.io.to(this.room).emit('letter', {letter: this.letters[0]});
    this.last = this.letters[0];
    this.letters = this.letters.slice(1);
  }

}