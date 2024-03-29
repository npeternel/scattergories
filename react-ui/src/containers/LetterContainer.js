import React from 'react';
import PropTypes from 'prop-types';

class LetterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      letter: ''
    };
  }

  componentDidMount() {
    this.socket.on('game', (data) => {
      const { letter } = data.game;
      this.setState({
        letter
      });
    });
  }

  shuffleLetter = () => {
    this.socket.emit('letter:shuffle');
  }

  render() {
    const { letter } = this.state;
    return (
      <div className="letter">
        <h4>Letter</h4>
        <h1 style={{ fontSize: '5em' }}>{letter}</h1>
        <div className="shuffle-btn">
          <button type="button" onClick={() => this.shuffleLetter()}>
            Shuffle
          </button>
        </div>
      </div>
    );
  }
}

LetterContainer.propTypes = {
  socket: PropTypes.object.isRequired
};

export default LetterContainer;
