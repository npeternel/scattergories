const letters = require('../data/letters.json');

const shuffleLetters = () => {
  const array = [...letters];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
      shuffled = shuffleLetters();
      if (!this.last || (this.last && shuffled[0] !== this.last)) sameAsLast = false;
    }
    this.last = '';
    return shuffled;
  }

  curr() {
    if (!this.letters || this.letters.length === 0) {
      this.letters = this.newLetters();
    }
    // this.io.to(this.room).emit('letter', {letter: this.letters[0]});
    return this.letters[0];
  }

  next() {
    this.letters = this.letters.slice(1);
    if (!this.letters || this.letters.length === 0) {
      this.letters = this.newLetters();
    }
    this.io.to(this.room).emit('letter', { letter: this.letters[0] });
    const [last] = this.letters;
    this.last = last;
  }
};
