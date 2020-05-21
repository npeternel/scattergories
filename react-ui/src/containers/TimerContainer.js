import React from 'react';
import Timer from '../components/Timer';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      time: 120,
      running: false
    };
  }

  componentDidMount() {
    this.socket.on('time', (data) => {
      this.setTimer(data.time, data.running);
    });
  }

  setTimer = (time, running) => {
    this.setState({
      time: time,
      running: running
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

  render() {
    return (
      <Timer time={this.state.time} running={this.state.running} handleClick={this.toggleTimer} handleReset={this.resetTimer}/>
    )
  }
}

export default TimerContainer;