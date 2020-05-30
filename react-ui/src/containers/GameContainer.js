import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LetterContainer from './LetterContainer';
import TimerContainer from './TimerContainer';
import CategoryContainer from './CategoryContainer';
import PlayersContainer from './PlayersContainer';

const server = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';
const socket = io(server);

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    const { name } = props;
    this.state = {
      name,
      redirect: name === ''
    };
  }

  componentDidMount() {
    const { name } = this.state;
    socket.emit('join', name);
  }

  render() {
    const { name, redirect } = this.state;
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
