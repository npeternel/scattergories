import React from 'react';
import '../index.css';
import HomeModal from '../components/HomeModal';

class MainContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      input: ''
    };
  }

  handleClose = () => {
    const { input } = this.state;
    this.setState({
      show: false,
      input
    });
  }

  handleShow = () => {
    const { input } = this.state;
    this.setState({
      show: true,
      input
    });
  }

  handleValue = (event) => {
    const { show } = this.state;
    this.setState({
      show,
      input: event.target.value
    });
  }

  render() {
    const { show, input } = this.state;
    return (
      <div>
        <h1 className="title">Scattergories</h1>
        { show
          ? (
            <HomeModal
              input={input}
              handleValue={this.handleValue}
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

export default MainContainer;
