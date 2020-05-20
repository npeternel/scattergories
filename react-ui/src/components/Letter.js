import React from 'react';

class Letter extends React.Component {

  handleShuffle() {
    // event.preventDefault();
    this.props.handleShuffle();
  }

  render() {
    return (
      <div>
        <h1>{this.props.letter}</h1>
        <button onClick={() => this.handleShuffle()}>
          Shuffle Letter
        </button>
      </div>
    )
  }
}

export default Letter;