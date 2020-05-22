import React from 'react';
import '../App.css';
import LetterContainer from './LetterContainer';
import TimerContainer from './TimerContainer';
import CategoryContainer from './CategoryContainer';
import PlayersContainer from './PlayersContainer';
import io from 'socket.io-client';

const socket = io('localhost:3001');

function App() {
  return (
    <div className="App">
      <LetterContainer socket={socket}/>
      <TimerContainer socket={socket}/>
      <CategoryContainer name={'Nicki'} socket={socket}/>
      <PlayersContainer socket={socket} />
    </div>
  );
}

export default App;
