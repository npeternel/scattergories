'use strict';

const express = require('express');
const socket = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const Timer = require('./classes/timer');
const Letter = require('./classes/letter');
const Categories = require('./classes/categories');

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
      timer: new Timer(120, io, id),
      letter: new Letter(io, id),
      categories: new Categories(io, id)
    };
    rooms[room.id] = room;
    console.log(`Room with UUID ${room.id} created`);
  }
  const id = Object.keys(rooms)[0];
  const room = rooms[id];
  socket.join(id);
  console.log('New client');
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
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.leave(id);
  });
});
