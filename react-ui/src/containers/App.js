import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameContainer from './GameContainer';
import MainContainer from './MainContainer';

const App = () => (
  <div>
    <Router>
      <Route exact path="/game" component={GameContainer} />
      <Route exact path="/" component={MainContainer} />
    </Router>
  </div>
);

export default App;
