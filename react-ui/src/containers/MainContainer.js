import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import HomeModal from '../components/HomeModal';

class MainContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }

  handleShow = () => {
    this.setState({
      show: true
    });
  }

  render() {
    const { show } = this.state;
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
            <button type="button" className="join-btn" onClick={this.handleShow}>
              Join Game
            </button>
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
