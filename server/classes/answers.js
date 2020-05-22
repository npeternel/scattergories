'use strict';

module.exports = class Answers {
  constructor(io, room) {
    this.io = io;
    this.room = room;
    this.answers = {};
    this.sent = false;
  }

  // returns true if all answers were submitted from each client in the room
  allSubmitted() {
    const clients = this.clients();
    for (const client of clients) {
      if (!this.answers[client]) return false;
    }
    return true;
  }

  submit(data) {
    this.answers[data.id] = data.answers;
  }

  clients() {
    return Object.keys(this.io.sockets.adapter.rooms[this.room].sockets);
  }

  reset() {
    this.answer = {};
    this.sent = false;
  }

  merge(clients) {
    if (!this.sent) {
      const results = {};
      for (const [client, answers] of Object.entries(this.answers)) {
        for (const [number, answer] of Object.entries(answers)) {
          if (results[number]) {
            results[number][clients[client]] = answer;
          } else {
            const tmp = {};
            tmp[clients[client]] = answer;
            results[number] = tmp;
          }
        }
      }
      for (const [question, result] of Object.entries(results)) {
        for (const client of this.clients()) {
          if (!result[clients[client]]) {
            results[question][clients[client]] = '';
          }
        }
      }
      this.io.to(this.room).emit('answers:results', results);
      this.sent = true;
    }
  }

}