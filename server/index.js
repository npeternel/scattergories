'use strict';

const express = require('express');
const socket = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const Timer = require('./classes/timer');
const Letter = require('./classes/letter');
const Categories = require('./classes/categories');
const Answers = require('./classes/answers');

const app = express();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

const io = socket(server);

const rooms = {};

io.on('connection', (socket) => {
  if (Object.keys(rooms).length === 0) {
    const id = uuidv4();
    const room = {
      id: id,
      name: 'myroom',
      clients: [],
      timer: new Timer(5, io, id),
      letter: new Letter(io, id),
      categories: new Categories(io, id),
      answers: new Answers(io, id)
    };
    rooms[room.id] = room;
    console.log(`Room with UUID ${room.id} created`);
  }
  const id = Object.keys(rooms)[0];
  const room = rooms[id];
  console.log('New client');
  // socket.on('join', (clientId) => {
  //   console.log('New client', clientId);
  //   if (room.clients.some((client) => client === clientId)) return;
  //   socket.join(id);
  //   room.clients.push(clientId);
  // });
  socket.join(id);
  room.letter.curr();
  room.categories.curr();
  socket.on('letter:shuffle', () => {
    room.timer.reset();
    room.letter.next();
  });
  socket.on('categories:shuffle', () => {
    room.timer.reset();
    room.categories.next();
  });
  socket.on('timer:start', () => {
    room.timer.start();
  });
  socket.on('timer:reset', () => {
    room.timer.reset();
  });
  socket.on('timer:stop', () => {
    room.timer.stop();
  });
  socket.on('answers', (data) => {
    room.answers.submit(data);
    const interval = setInterval(() => {
      if (room.answers.allSubmitted()) {
        clearInterval(interval);
        console.log('All answers submitted');
        room.answers.merge();
        // io.to(id).emit('answers:results', room.answers.merge());
      }
    },
    1000);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.leave(id);
    // if (io.sockets.adapter.rooms[id].sockets.length === 0) delete rooms[id];
  });
});
