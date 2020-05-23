import React from 'react';

class Timer extends React.Component {

  render() {
    const {
      running,
      time,
      ended
    } = this.props.state;
    return (
      <div className="timer">
        <h4>Time</h4>
        <h1>{time}</h1>
        {ended ? null :
          <button onClick={() => this.props.handleClick()}>
            {running ? 'Pause Game' : 'Start Game'}
          </button>
        }
        {ended ? 
          <button onClick={() => this.props.handleRestart()}>
            New Game
          </button> :
          <button onClick={() => this.props.handleReset()}>
            Reset Timer
          </button>
  }
      </div>
    )
  }

}

export default Timer;