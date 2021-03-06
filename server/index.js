const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const locks = require('locks');
const Timer = require('./classes/timer');
const Letter = require('./classes/letter');
const Categories = require('./classes/categories');
const { Answers } = require('./classes/answers');

const app = express();

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});

const io = socketio(server);

const rooms = {};
const TIME = process.env.NODE_ENV === 'production' ? 120 : 10;

io.on('connection', (socket) => {
  if (Object.keys(rooms).length === 0) {
    const id = uuidv4();
    const room = {
      id,
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
      io.to(roomId).emit('room', {
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
    if (data.name) {
      const mutex = locks.createMutex();
      mutex.lock(() => {
        room.answers.submit(data);
        console.log(`Received answers from ${data.name}`);
        mutex.unlock();
      });
    }
    const interval = setInterval(() => {
      if (room.answers.allSubmitted(Object.values(room.clients))) {
        clearInterval(interval);
        room.answers.merge(room.letter.curr());
      }
    },
    1000);
  });
  socket.on('disconnect', () => {
    console.log(`${room.clients[socket.id]} left`);
    socket.leave(roomId);
    delete room.clients[socket.id];
    io.to(roomId).emit('room', {
      clients: Object.values(room.clients),
      time: room.timer.curr(),
      letter: room.letter.curr(),
      categories: room.categories.curr()
    });
    // if (io.sockets.adapter.rooms[id].sockets.length === 0) delete rooms[id];
  });
});
