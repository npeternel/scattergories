import React from 'react';
import '../index.css';

const Players = (props) => {
  const { players } = props || [];
  return (
    <ul>
      {players.map((player) => <li key={`${player}-${new Date().getTime()}`}>{player}</li>)}
    </ul>
  );
};

export default Players;
