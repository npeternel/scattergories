import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LetterContainer from './LetterContainer';
import TimerContainer from './TimerContainer';
import CategoryContainer from './CategoryContainer';
import PlayersContainer from './PlayersContainer';



class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    const { name, socket } = props;
    console.log(`Constructor name ${name}`);
    console.log(`Socket ${socket}`);
    this.state = {
      socket,
      name,
      redirect: name === ''
    };
  }

  render() {
    const { socket, name, redirect } = this.state;
    return redirect
      ? <Redirect to="/" />
      : (
        <div>
          <LetterContainer socket={socket} />
          <div className="mid">
            <TimerContainer socket={socket} />
            <CategoryContainer name={name} socket={socket} />
          </div>
          <PlayersContainer socket={socket} />
        </div>
      );
  }
}

GameContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default GameContainer;
