import React from 'react';

class Timer extends React.Component {

  render() {
    const {
      running,
      time,
      ended
    } = this.props.state;
    return (
      <div>
        <h1>{time}</h1>
        {ended ? null :
          <button onClick={() => this.props.handleClick()}>
            {running ? 'Pause' : 'Start'}
          </button>
        }
        {ended ? 
          <button onClick={() => this.props.handleRestart()}>
            Restart
          </button> :
          <button onClick={() => this.props.handleReset()}>
            Reset
          </button>
  }
      </div>
    )
  }

}

export default Timer;