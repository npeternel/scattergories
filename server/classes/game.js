const Letter = require('./letter');
const Categories = require('./categories');
const Answers = require('./answers');

const phases = {
  BEGINNING: 'beginning',
  RUNNING: 'running',
  PAUSED: 'paused',
  END: 'end',
  REVIEWING: 'reviewing'
};

module.exports.Game = class Game {
  constructor(io, duration, id, players) {
    this.io = io;
    this.room = id;
    this.letter = new Letter(id);
    this.categories = new Categories(id);
    this.answers = new Answers(id);
    this.game = {
      categories: this.categories.curr(),
      timer: {
        time: duration
      },
      letter: this.letter.curr(),
      results: {},
      phase: phases.BEGINNING,
      players: players
    };
    this.duration = duration;
    this.interval = undefined;
  }

  setPlayers(players) {
    this.game.players = players;
  }

  allSubmitted(clients) {
    return this.answers.allSubmitted(clients);
  }

  submit(data) {
    this.answers.submit(data);
  }

  compileAndSendResults() {
    this.game.phase = phases.REVIEWING;
    this.game.results = this.answers.merge(this.letter.curr());
    this.emitGame();
    this.emitTime();
  }

  emitTime() {
    console.log(`Sending time: ${this.toString()}`);
    this.io.to(this.room).emit('time', { game: this.game });
  }

  toString() {
    return `Letter: ${this.game.letter}, Time: ${this.game.timer.time}, Phase: ${this.game.phase}, Players: ${this.game.players}`;
  }

  emitGame() {
    console.log(`Sending game: ${this.toString()}`);
    this.io.to(this.room).emit('game', { game: this.game });
  }

  shuffleLetter() {
    // TODO: if the categories haven't been revealed, no need to go to the next
    this.game.categories = this.categories.next();
    this.game.letter = this.letter.next();
    this.answers.reset();
    this.game.phase = phases.BEGINNING;
    this.resetTimer();
    this.emitGame();
  }

  shuffleCategories() {
    this.game.categories = this.categories.next();
    this.answers.reset();
    this.game.phase = phases.BEGINNING;
    this.resetTimer();
    this.emitGame();
  }

  start() {
    // if the game was ended, start a new game
    if (this.game.phase == phases.REVIEWING && this.game.phase == phases.END) {
    // if (this.game.phase == phases.REVIEWING && this.game.timer.time <= 0) {
      this.game.phase = phases.BEGINNING;
      this.game.results = {};
      this.shuffleLetter();
      this.startTimer();
      this.emitGame();
    // if it was paused, resume the timer
    } else if (this.game.phase === phases.BEGINNING || this.game.phase === phases.PAUSED) {
      this.game.phase = phases.RUNNING;
      this.startTimer();
      this.emitGame();
    }
  }

  startTimer() {
    console.log('Starting timer');
    // TODO: figure out this line
    this.game.phase = phases.RUNNING;
    if (this.game.timer <= 0) this.resetTimer();
    this.emitTime();
    this.interval = setInterval(() => this.tickTimer(), 1000);
  }

  resetTimer() {
    console.log('Resetting timer');
    this.game.timer.time = this.duration;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    this.emitTime();
  }

  tickTimer() {
    if (this.game.timer.time <= 0) {
      this.endGame();
    } else {
      this.game.timer.time -= 1;
      this.emitTime();
    }
  }

  endGame() {
    console.log('Ending');
    this.io.to(this.room).emit('time:end');
    this.game.phase = phases.END;
    this.pause();
  }

  pause() {
    this.stopTimer();
    this.emitGame();
  }

  stopTimer() {
    console.log('Pausing timer');
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (this.game.phase !== phases.END) {
      this.game.phase = phases.PAUSED;
    }
    this.emitTime();
  }

  getGame() {
    return this.game;
  }

}

