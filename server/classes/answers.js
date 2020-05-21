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
    console.log(this.answers);
    return true;
  }

  submit(data) {
    this.answers[data.id] = data.answers;
  }

  clients() {
    return Object.keys(this.io.sockets.adapter.rooms[this.room].sockets);
  }

  merge() {
    if (!this.sent) {
      const results = {};
      for (const [client, answers] of Object.entries(this.answers)) {
        for (const [number, answer] of Object.entries(answers)) {
          if (results[number]) {
            results[number][client] = answer;
          } else {
            const tmp = {};
            tmp[client] = answer;
            results[number] = tmp;
          }
        }
      }
      console.log(results);
      this.io.to(this.room).emit('answers:results', results);
      this.sent = true;
    }
  }

}