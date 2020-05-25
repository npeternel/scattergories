import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const {
    running,
    time,
    ended,
    handleClick,
    handleRestart,
    handleReset
  } = props;
  return (
    <div className="timer">
      <h4>Time</h4>
      <h1>{time}</h1>
      <div className="timer-btn">
        {ended ? null
          : (
            <button type="button" onClick={() => handleClick()}>
              {running ? 'Pause Game' : 'Start Game'}
            </button>
          )}
        {ended
          ? (
            <button type="button" onClick={() => handleRestart()}>
              New Game
            </button>
          )
          : (
            <button type="button" onClick={() => handleReset()}>
              Reset Timer
            </button>
          )}
      </div>
    </div>
  );
};

Timer.propTypes = {
  running: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  ended: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleRestart: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Timer;
