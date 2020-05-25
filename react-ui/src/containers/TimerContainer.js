import React from 'react';
import PropTypes from 'prop-types';
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
    this.socket.on('room', (data) => {
      const { running } = this.state;
      this.setTimer(data.time, running);
    });
    this.socket.on('game:start', () => {
      const { running, time } = this.state;
      this.setState({
        time,
        running,
        ended: false
      });
    });
    this.socket.on('time', (data) => {
      this.setTimer(data.time, data.running);
    });
    this.socket.on('time:end', () => {
      const { time } = this.state;
      this.setState({
        time,
        running: false,
        ended: true
      });
    });
  }

  setTimer = (time, running) => {
    const { ended } = this.state;
    this.setState({
      time,
      running,
      ended
    });
  }

  toggleTimer = () => {
    const { running } = this.state;
    if (running) {
      this.socket.emit('timer:stop');
    } else {
      this.socket.emit('timer:start');
    }
  }

  resetTimer = () => {
    this.socket.emit('timer:reset');
  }

  restartGame = () => {
    this.socket.emit('game:restart');
  }

  render() {
    const { running, time, ended } = this.state;
    return (
      <Timer
        running={running}
        time={time}
        ended={ended}
        handleClick={this.toggleTimer}
        handleReset={this.resetTimer}
        handleRestart={this.restartGame}
      />
    );
  }
}

TimerContainer.propTypes = {
  socket: PropTypes.object.isRequired
};

export default TimerContainer;
