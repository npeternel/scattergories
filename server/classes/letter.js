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
  constructor(room) {
    this.letters = this.newLetters();
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
    return this.letters[0];
  }

  next() {
    this.letters = this.letters.slice(1);
    if (!this.letters || this.letters.length === 0) {
      this.letters = this.newLetters();
    }
    const [last] = this.letters;
    this.last = last;
    return this.letters[0];
  }
};
