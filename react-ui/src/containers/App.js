import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';
import GameContainer from './GameContainer';
import MainContainer from './MainContainer';

const server = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';
const socket = io(server);

const App = () => {
  const [name, setName] = useState('');
  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <Router>
        <Route exact path="/game">
          <GameContainer name={name} socket={socket} />
        </Route>
        <Route exact path="/">
          <MainContainer name={name} handleName={handleName} socket={socket} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
