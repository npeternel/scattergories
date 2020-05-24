import React from 'react';

const Timer = (props) => {

  const {
    running,
    time,
    ended
  } = props.state;
  return (
    <div className="timer">
      <h4>Time</h4>
      <h1>{time}</h1>
      <div className="timer-btn">
        {ended ? null
          : (
            <button type="button" onClick={() => props.handleClick()}>
              {running ? 'Pause Game' : 'Start Game'}
            </button>
          )}
        {ended
          ? (
            <button type="button" onClick={() => props.handleRestart()}>
              New Game
            </button>
          )
          : (
            <button type="button" onClick={() => props.handleReset()}>
              Reset Timer
            </button>
          )}
      </div>
    </div>
  );
};

export default Timer;
