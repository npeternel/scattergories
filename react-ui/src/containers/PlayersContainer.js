import React from 'react';
import PropTypes from 'prop-types';
import Players from '../components/Players';
import '../index.css';

class PlayersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    this.socket.on('game', (data) => {
      const { players } = data.game;
      this.setState({
        players
      });
    });
  }


  render() {
    const { players } = this.state;
    return (
      <div className="players">
        <h3>Players</h3>
        <Players players={players} />
      </div>
    );
  }
}

PlayersContainer.propTypes = {
  socket: PropTypes.object.isRequired
};

export default PlayersContainer;
