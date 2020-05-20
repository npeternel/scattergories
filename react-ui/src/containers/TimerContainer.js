import React from 'react';
import Timer from '../components/Timer';
import io from 'socket.io-client';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 120,
      running: false
    };

    this.socket = io('localhost:3001');
    this.socket.on('timer', (time) => {
      this.setTimer(time);
    });
  }

  setTimer = (time) => {
    this.setState({
      time: time,
      running: this.state.running
    });
  }

  toggleTimer = () => {
    if (this.state.running) {
      this.socket.emit('stop');
    }
    if (!this.state.running) {
      this.socket.emit('start');
    }
    this.setState({
      time: this.state.time,
      running: !this.state.running
    });
  }

  resetTimer = () => {
    this.socket.emit('reset');
    this.setState({
      time: this.state.time,
      running: false
    });
  }

  render() {
    return (
      <Timer time={this.state.time} running={this.state.running} handleClick={this.toggleTimer} handleReset={this.resetTimer}/>
    )
  }
}

export default TimerContainer;