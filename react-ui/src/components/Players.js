import React from 'react';
import '../index.css';

const Players = (props) => {
  const { players } = props || [];
  const playerList = players || [];
  return (
    <ul>
      {playerList.map((player) => <li key={`${player}-${new Date().getTime()}`}>{player}</li>)}
    </ul>
  );
};

export default Players;
