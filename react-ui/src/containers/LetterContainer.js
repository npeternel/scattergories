import React from 'react';
import Letter from '../components/Letter';

class LetterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      letter: ''
    }
  }

  componentDidMount() {
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
      <div>
        <Letter letter={this.state.letter} handleClick={this.shuffleLetter}/>
      </div>
    )
  }
}

export default LetterContainer;