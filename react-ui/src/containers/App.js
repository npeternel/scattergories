import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameContainer from './GameContainer';
import MainContainer from './MainContainer';

const App = () => {
  const [name, setName] = useState('');
  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <Router>
        <Route exact path="/game">
          <GameContainer name={name} />
        </Route>
        <Route exact path="/">
          <MainContainer name={name} handleName={handleName} />
        </Route>
      </Router>
    </div>
  );
};

export default App;
