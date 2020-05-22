'use strict';

const express = require('express');
const path = require('path');
const socket = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const Timer = require('./classes/timer');
const Letter = require('./classes/letter');
const Categories = require('./classes/categories');
const Answers = require('./classes/answers');

const app = express();

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

const io = socket(server);

const rooms = {};
const TIME = 120;

io.on('connection', (socket) => {
  if (Object.keys(rooms).length === 0) {
    const id = uuidv4();
    const room = {
      id: id,
      name: 'myroom',
      clients: {},
      timer: new Timer(TIME, io, id),
      letter: new Letter(io, id),
      categories: new Categories(io, id),
      answers: new Answers(io, id)
    };
    rooms[room.id] = room;
    console.log(`Room with UUID ${room.id} created`);
  }
  const roomId = Object.keys(rooms)[0];
  const room = rooms[roomId];
  socket.on('join', (name) => {
    if (!Object.values(room.clients).some((client) => client === name)) {
      console.log(`New client ${name}`);
      socket.join(roomId);
      room.clients[socket.id] = name;
      io.to(roomId).emit('initial', {
        clients: Object.values(room.clients),
        time: room.timer.curr(),
        letter: room.letter.curr(),
        categories: room.categories.curr()
      });
    }
  });
  socket.on('letter:shuffle', () => {
    room.timer.reset();
    room.letter.next();
  });
  socket.on('categories:shuffle', () => {
    room.timer.reset();
    room.categories.next();
  });
  socket.on('game:restart', () => {
    room.categories.next();
    room.letter.next();
    room.answers.reset();
    io.to(roomId).emit('game:start');
    room.timer.reset();
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
        room.answers.merge(room.clients);
      }
    },
    1000);
  });
  socket.on('disconnect', () => {
    console.log(`${room.clients[socket.id]} left`);
    socket.leave(roomId);
    delete room.clients[socket.id];
    // if (io.sockets.adapter.rooms[id].sockets.length === 0) delete rooms[id];
  });
});
