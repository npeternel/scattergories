'use strict';

const categories = require('../data/categories.json');

module.exports = class Categories {
  constructor(io, room) {
    this.unused = this.initialize();
    this.io = io;
    this.room = room;
  }

  initialize() {
    let duplicates = true;
    let shuffled;
    while (duplicates) {
      shuffled = this.shuffleCategories();
      if (this.unused === undefined) duplicates = false;
      else if (shuffled[0] !== this.unused[0]) duplicates = false;
    }
    return shuffled;
  }

  shuffleCategories() {
    const array = [...categories];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  curr() {
    // this.io.to(this.room).emit('categories', {categories: this.unused.slice(0,12)});
    return this.unused.slice(0,12);
  }

  next() {
    this.unused = this.unused.slice(13);
    if (this.unused.length < 12) {
      this.unused = this.unused.concat(this.shuffleCategories());
    }
    this.io.to(this.room).emit('categories', {categories: this.unused.slice(0,12)});
  }

}