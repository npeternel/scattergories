import React from 'react';
import '../App.css';
import GameContainer from './GameContainer';
import MainContainer from './MainContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path='/game' component={GameContainer} />
        <Route exact path='/' component={MainContainer}/>
      </Router>
    </div>
  )
};

export default App;
