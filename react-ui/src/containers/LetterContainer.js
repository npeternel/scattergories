import React from 'react';

class LetterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      letter: ''
    }
  }

  componentDidMount() {
    this.socket.on('room', (data) => {
      this.setState({
        letter: data.letter
      });
    });
    this.socket.on('letter', (data) => {
      this.setState({
        letter: data.letter
      });
    });
  }

  shuffleLetter = () => {
    this.socket.emit('letter:shuffle');
  }

  render() {
    return (
      <div className="letter">
        <h4>Letter</h4>
        <h1 style={{'font-size': '100px'}}>{this.state.letter}</h1>
        <button onClick={() => this.shuffleLetter()}>
          Shuffle
        </button>
      </div>
    )
  }
}

export default LetterContainer;