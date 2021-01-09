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
    this.socket = socket;
    this.state = {
      name,
      redirect: name === ''
    };
  }

  componentDidMount() {
    const { name } = this.state;
    this.socket.emit('join', name);
  }

  render() {
    const { name, redirect } = this.state;
    return redirect
      ? <Redirect to="/" />
      : (
        <div>
          <LetterContainer socket={this.socket} />
          <div className="mid">
            <TimerContainer socket={this.socket} />
            <CategoryContainer name={name} socket={this.socket} />
          </div>
          <PlayersContainer socket={this.socket} />
        </div>
      );
  }
}

GameContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default GameContainer;
