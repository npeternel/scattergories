'use strict';

const express = require('express');
const socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

const io = socket(server);

let timer = 120;
let interval;
io.on('connection', (socket) => {
  console.log('new client');
  socket.on('start', () => {
    console.log('starting');
    interval = setInterval(() => {
      timer--;
      socket.emit('timer', timer);
      if (timer === 0) {
        clearInterval(interval);
      }
    }, 1000);
  });
  socket.on('reset', () => {
    console.log('resetting');
    clearInterval(interval);
    timer = 120;
    socket.emit('timer', timer);
  });
  socket.on('stop', () => {
    console.log('stopping');
    clearInterval(interval);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
