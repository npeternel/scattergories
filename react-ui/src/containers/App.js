import React from 'react';
import '../App.css';
import LetterContainer from './LetterContainer';
import TimerContainer from './TimerContainer';
import CategoryContainer from './CategoryContainer';

function App() {
  return (
    <div className="App">
      <LetterContainer />
      <TimerContainer />
      <CategoryContainer />
    </div>
  );
}

export default App;
