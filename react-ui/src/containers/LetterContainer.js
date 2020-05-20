import React from 'react';
import Letter from '../components/Letter';

// omitting: Q, X, V, Y, Z
const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'R',
  'S',
  'T',
  'U',
  'W'
];

class LetterContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.initialLetters();
  }

  initialLetters() {
    let duplicates = true;
    let shuffled;
    while (duplicates) {
      shuffled = this.shuffleLetters();
      if (this.state === undefined) duplicates = false;
      else if (shuffled[0] !== this.state.letter) duplicates = false;
    }
    return {
      unused: shuffled.slice(1),
      letter: shuffled[0]
    }
  }

  shuffleLetters() {
    const array = [...letters];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  updateLetterState = () => {
    if (this.state.unused.length === 0) {
      this.setState(this.initialLetters());
    } else {
      this.setState({
        unused: this.state.unused.slice(1),
        letter: this.state.unused[0]
      });
    }
  };

  render() {
    return (
      <div>
        <Letter letter={this.state.letter} handleClick={this.updateLetterState}/>
      </div>
    )
  }
}

export default LetterContainer;