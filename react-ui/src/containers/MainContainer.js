import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import HomeModal from '../components/HomeModal';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    const { socket } = this.props;
    this.socket = socket;

    this.state = {
      show: false,
      rooms: ['foo', 'bar', 'Nicki\'s room']
    };
  }

  componentDidMount() {
    const { show } = this.state;
    this.socket.on('room:list', ({ rooms }) => {
      this.setState({
        show,
        rooms
      });
    });
  }

  handleClose = () => {
    const { rooms } = this.state;
    this.setState({
      show: false,
      rooms
    });
  }

  handleShow = () => {
    const { rooms } = this.state;
    this.setState({
      show: true,
      rooms
    });
  }

  render() {
    const { show, rooms } = this.state;
    const { name, handleName } = this.props;
    return (
      <div>
        <h1 className="title">Scattergories</h1>
        { show
          ? (
            <HomeModal
              name={name}
              handleName={handleName}
              handleClose={this.handleClose}
              handleShow={this.handleShow}
            />
          )
          : (
            <div className="rooms">
            <button type="button" className="room-join-btn" onClick={this.handleShow}>
              Create Room
            </button>
            {rooms.map((room) => (
            <div key={room} className="room">
              <p className="room-name">{room}</p>
              <button type="button" className="room-join-btn" onClick={this.handleShow}>
                Join Room
              </button>
            </div>
            ))}
          </div>
          )}
      </div>
    );
  }
}

MainContainer.propTypes = {
  name: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired
};

export default MainContainer;
