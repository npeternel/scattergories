import React from 'react';
import '../index.css';

class Players extends React.Component {

  render() {
    const players = this.props.players || [];
    return (
      <ul>
        {players.map((player, i) => 
        <li key={`${i}player`}>{player}</li>
        )}
      </ul>
    )
  }
}

export default Players;