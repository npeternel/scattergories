const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const locks = require('locks');
const { Game } = require('./classes/game');

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
const TIME = process.env.NODE_ENV === 'production' ? 120 : 3;

io.on('connection', (socket) => {
  let currentRoomId;
  if (Object.keys(rooms).length === 0) {
    // if there are no rooms, create a new room
    const id = uuidv4();
    currentRoomId = id;
    const room = {
      id,
      name: 'myroom',
      clients: {},
      game: new Game(io, TIME, id, {})
    };
    rooms[room.id] = room;
    console.log(`Room with UUID ${room.id} created`);
  } else {
    // for now, use the first room's ID
    currentRoomId = Object.keys(rooms)[0];
  }
  const currentRoom = rooms[currentRoomId];
  // when a new player joins, add them to the current room
  socket.on('join', (name) => {
    if (!Object.values(currentRoom.clients).some((client) => client === name)) {
      console.log(`New client ${name}`);
      socket.join(currentRoomId);
      currentRoom.clients[socket.id] = name;
      // send them the current state of the room
      console.log(`Sending client ${name} the room`);
      currentRoom.game.setPlayers(Object.values(currentRoom.clients));
      currentRoom.game.emitGame();
      currentRoom.game.emitTime();
    }
  });

  // when the player shuffles the letter, reset the game
  socket.on('letter:shuffle', () => {
    currentRoom.game.shuffleLetter();
  });

  // when the player shuffles the categories, reset the game
  socket.on('categories:shuffle', () => {
    currentRoom.game.shuffleCategories();
  });
  socket.on('timer:start', () => {
    currentRoom.game.start();
  });
  socket.on('timer:reset', () => {
    currentRoom.game.resetTimer();
  });
  socket.on('timer:pause', () => {
    currentRoom.game.pause();
  });
  socket.on('answers', (data) => {
    if (data.name) {
      const mutex = locks.createMutex();
      mutex.lock(() => {
        currentRoom.game.submit(data);
        console.log(`Received answers from ${data.name}`);
        mutex.unlock();
      });
    }
    const interval = setInterval(() => {
      if (currentRoom.game.allSubmitted(Object.values(currentRoom.clients))) {
        clearInterval(interval);
        currentRoom.game.compileAndSendResults();
      }
    },
    1000);
  });
  socket.on('disconnect', () => {
    console.log(`${currentRoom.clients[socket.id]} left`);
    socket.leave(currentRoomId);
    delete currentRoom.clients[socket.id];
    currentRoom.game.setPlayers(Object.values(currentRoom.clients));
    currentRoom.game.emitGame();
    // if (io.sockets.adapter.rooms[id].sockets.length === 0) delete rooms[id];
  });
});
