import React from 'react';
import LetterContainer from './LetterContainer';
import TimerContainer from './TimerContainer';
import CategoryContainer from './CategoryContainer';
import PlayersContainer from './PlayersContainer';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';

const server = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '';
const socket = io(server);

class GameContainer extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      redirect: false
    }
  }

  componentDidMount() {
    const name = this.props.location.name;
    if (name) {
      this.setState({
        name: name,
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
    return this.state.redirect ?
      <Redirect to='/'/>
      :
      <div>
        <LetterContainer socket={socket}/>
        <div className="mid">
        <TimerContainer socket={socket}/>
        <CategoryContainer name={this.state.name} socket={socket}/>
        </div>
        <PlayersContainer socket={socket} />
      </div>
    }
}

export default GameContainer;
