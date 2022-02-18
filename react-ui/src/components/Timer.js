import React from 'react';
import PropTypes from 'prop-types';
import { phases } from '../phases';

const Timer = (props) => {
  const {
    time,
    phase,
    handleClick,
    handleNewGame,
    handleReset
  } = props;
  return (
    <div className="timer">
      <h4>Time</h4>
      <h1>{time}</h1>
      <div className="timer-btn">
        {(() => {
          if (phase === phases.RUNNING) {
            return <button type="button" onClick={() => handleClick()}>Pause</button>
          }
          if (phase === phases.PAUSED) {
            return <button type="button" onClick={() => handleClick()}>Resume</button>
          }
          if (phase === phases.BEGINNING)
            return <button type="button" onClick={() => handleClick()}>Start</button>
          if (phase === phases.END)
            return <div>Time's up!</div>
          if (phase === phases.REVIEWING)
            return <button type="button" onClick={() => handleNewGame()}>New Game</button>
        })()
      }
        {/* {ended
          ? (

          )
          : (
            <button type="button" onClick={() => handleReset()}>
              Reset Timer
            </button>
          )} */}
      </div>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  phase: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleNewGame: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default Timer;
