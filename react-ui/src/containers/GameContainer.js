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
  constructor() {
    super();

    this.state = {
      name: '',
      redirect: false
    };
  }

  componentDidMount() {
    const { location: { name } } = this.props;
    if (name) {
      this.setState({
        name,
        redirect: false
      });
      socket.emit('join', name);
    } else {
      this.setState({
        name: '',
        redirect: true
      });
    }
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
  location: PropTypes.object.isRequired
};

export default GameContainer;
