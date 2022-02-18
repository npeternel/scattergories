import React, { useState } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import GameContainer from './GameContainer';
import MainContainer from './MainContainer';
import io from 'socket.io-client';

const server = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';

const App = () => {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState(null);
  const handleJoin = () => {
    if (name !== null || name !== '') {
      console.log(`Joining with name ${name}`);
      const newSocket = io(server);
      newSocket.emit('join', name);
      setSocket(newSocket);
    }
  };
  const handleName = (event) => {
    const enteredName = event.target.value;
    if (enteredName !== null || enteredName !== '') {
      console.log(`Setting name to ${enteredName}`);
      setName(enteredName);
    }
  };
  console.log(`Passing socket as ${socket}`);
  return (
    <div>
      <Router>
      <Route exact path="/game">
        {socket ? (
          <GameContainer socket={socket} name={name}/>
        ) :
        <Redirect to="/" />}
        </Route>
        <Route exact path="/">
          <MainContainer name={name} handleName={handleName} handleJoin={handleJoin} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
