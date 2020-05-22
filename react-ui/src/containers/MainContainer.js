import React from 'react';
import '../App.css';
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
    this.setState({
      show: false,
      input: this.state.input
    })
  }

  handleShow = () => {
    this.setState({
      show: true,
      input: this.state.input
    })
  }

  handleValue = (event) => {
    this.setState({
      show: this.state.show,
      input: event.target.value
    });
  }

  render() {
    return (
      <div>
        { this.state.show ?
          <HomeModal
            input={this.state.input}
            handleValue={this.handleValue}
            handleClose={this.handleClose}
            handleShow={this.handleShow}/>
        : <button onClick={this.handleShow}>
          Join Room
            </button>
        }
      </div>
    );
  }
}

export default MainContainer;
