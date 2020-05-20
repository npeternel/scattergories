import React from 'react';
import Letter from '../components/Letter';
import io from 'socket.io-client';

class LetterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      letter: ''
    }
  }

  componentDidMount() {
    this.socket = io('localhost:3001');
    this.socket.on('letter', (data) => {
      this.setState({
        letter: data.letter
      });
    });
  }

  updateLetterState = () => {
    this.socket.emit('letter:shuffle');
  }

  render() {
    return (
      <div>
        <Letter letter={this.state.letter} handleClick={this.updateLetterState}/>
      </div>
    )
  }
}

export default LetterContainer;