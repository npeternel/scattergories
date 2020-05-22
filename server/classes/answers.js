module.exports = class Answers {
  constructor(io, room) {
    this.io = io;
    this.room = room;
    this.answers = {};
    this.sent = false;
  }

  // returns true if all answers were submitted from each client in the room
  allSubmitted(clients) {
    for (const client of clients) {
      if (!this.answers[client]) return false;
    }
    return true;
  }

  submit(data) {
    this.answers[data.name] = data.answers;
  }

  reset() {
    this.answers = {};
    this.sent = false;
  }

  merge() {
    if (!this.sent) {
      const results = {};
      // create mapping of question number to {client: answer}
      for (const [client, answers] of Object.entries(this.answers)) {
        for (const [questionNumber, answer] of Object.entries(answers)) {
          if (results[questionNumber]) {
            results[questionNumber][client] = { answer };
          } else {
            const tmp = {};
            tmp[client] = { answer };
            results[questionNumber] = tmp;
          }
        }
      }
      // fill in results with empty values, duplicate answers, and client names
      for (const [question, responses] of Object.entries(results)) {
        const history = {};
        const clientsWithDuplicates = [];
        for (const [client, response] of Object.entries(responses)) {
          if (response.answer) {
            const formattedResponse = response.answer.trim().toLowerCase();
            if (history[formattedResponse]) {
              clientsWithDuplicates.push(client);
              clientsWithDuplicates.push(history[formattedResponse]);
            } else {
              history[formattedResponse] = client;
            }
            results[question][client].type = 'original';
          } else {
            results[question][client].type = 'blank';
          }
        }
        clientsWithDuplicates.forEach((client) => {
          results[question][client].type = 'duplicate';
        });
      }
      this.io.to(this.room).emit('answers:results', results);
      this.sent = true;
    }
  }
};
