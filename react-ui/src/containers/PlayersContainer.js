import React from 'react';
import Players from '../components/Players';
import '../index.css';

class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.socket.on('room', (data) => {
      this.setState({
        players: data.clients
      });
    });
  }


  render() {
    return (
      <div className="players">
        <h3>Players</h3>
        <Players players={this.state.players} />
      </div>
    )
  }
}

export default PlayersContainer;