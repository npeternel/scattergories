import React from 'react';

class Letter extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.letter}</h1>
        <button onClick={() => this.props.handleClick()}>
          Shuffle Letter
        </button>
      </div>
    )
  }
}

export default Letter;