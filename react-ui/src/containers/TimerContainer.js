import React from 'react';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import { phases } from '../phases';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      time: 120,
      phase: phases.BEGINNING
    };
  }

  componentDidMount() {
    this.socket.on('time', (data) => {
      const { phase } = data.game;
      const { time } = data.game.timer;
      this.setState({
        time,
        phase
      });
    });
  }

  toggleTimer = () => {
    const { phase } = this.state;
    if (phase === phases.RUNNING) {
      this.socket.emit('timer:pause');
    } else {
      this.socket.emit('timer:start');
    }
  }

  resetTimer = () => {
    this.socket.emit('timer:reset');
  }

  newGame = () => {
    this.socket.emit('letter:shuffle');
  }

  render() {
    const { time, phase } = this.state;
    return (
      <Timer
        time={time}
        phase={phase}
        handleClick={this.toggleTimer}
        handleReset={this.resetTimer}
        handleNewGame={this.newGame}
      />
    );
  }
}

TimerContainer.propTypes = {
  socket: PropTypes.object.isRequired
};

export default TimerContainer;
