import React from 'react';
import Timer from '../components/Timer';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      time: 120,
      running: false,
      ended: false
    };
  }

  componentDidMount() {
    this.socket.on('initial', (data) => {
      this.setTimer(data.time, this.state.running);
    });
    this.socket.on('time', (data) => {
      this.setTimer(data.time, data.running);
    });
    this.socket.on('time:end', () => {
      this.setState({
        time: this.state.time,
        running: false,
        ended: true
      });
    });
  }

  setTimer = (time, running) => {
    this.setState({
      time: time,
      running: running,
      ended: this.state.ended
    });
  }

  toggleTimer = () => {
    if (this.state.running) {
      this.socket.emit('timer:stop');
    }
    if (!this.state.running) {
      this.socket.emit('timer:start');
    }
  }

  resetTimer = () => {
    this.socket.emit('timer:reset');
  }

  restartGame = () => {
    this.socket.emit('game:restart');
    this.setState({
      time: this.state.time,
      running: this.state.running,
      ended: false
    });
  }

  render() {
    return (
      <Timer state={this.state} handleClick={this.toggleTimer} handleReset={this.resetTimer} handleRestart={this.restartGame}/>
    )
  }
}

export default TimerContainer;