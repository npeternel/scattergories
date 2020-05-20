import React from 'react';
import Timer from '../components/Timer';

class TimerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 120,
      running: false
    };
  }

  toggleTimer = () => {
    this.setState({
      time: this.state.time,
      running: !this.state.running
    });
  }

  render() {
    return (
      <Timer time={this.state.time} running={this.state.running} handleClick={this.toggleTimer}/>
    )
  }
}

export default TimerContainer;