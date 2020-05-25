module.exports.Answers = class Answers {
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

  merge(letter) {
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
      const resultsWithTypes = module.exports.determineResultTypes(results, letter);
      this.io.to(this.room).emit('answers:results', resultsWithTypes);
      this.sent = true;
    }
  }
};

function formatResponse(response) {
  return response.trim().toLowerCase().replace(/[^0-9a-z]/gi, '');
}

module.exports.determineResultTypes = (resultsIn, letter) => {
  const results = resultsIn;
  // fill in results with empty values, duplicate answers, and client names
  console.log(`Checking letter ${letter}`);
  const l = letter ? letter.toLowerCase() : '';
  for (const [question, responses] of Object.entries(results)) {
    const history = {};
    const clientsWithDuplicates = [];
    for (const [client, response] of Object.entries(responses)) {
      if (response.answer) {
        const formattedResponse = formatResponse(response.answer);
        if (letter && !formattedResponse.startsWith(l)) {
          results[question][client].type = 'incorrect';
        } else {
          if (history[formattedResponse]) {
            clientsWithDuplicates.push(client);
            clientsWithDuplicates.push(history[formattedResponse]);
          } else {
            history[formattedResponse] = client;
          }
          results[question][client].type = 'original';
        }
      } else {
        results[question][client].type = 'blank';
      }
    }
    clientsWithDuplicates.forEach((client) => {
      results[question][client].type = 'duplicate';
    });
  }
  return results;
};
