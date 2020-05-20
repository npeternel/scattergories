import React from 'react';

class Timer extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.time}</h1>
        <button onClick={() => this.props.handleClick()}>
          {this.props.running ? 'Stop' : 'Start'}
        </button>
      </div>
    )
  }

}

export default Timer;