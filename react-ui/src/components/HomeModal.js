import React from 'react';
import { Link } from 'react-router-dom';

class HomeModal extends React.Component {

  render() {
    return (
      <div>
        <button onClick={this.props.handleClose}>
          X
        </button>
        <h2>Enter Name</h2>
        <input value={this.props.input} onChange={(event) => this.props.handleValue(event)}>
        </input>

        <Link to={{pathname:'/game', name:this.props.input}}>Go</Link>

      </div>
    )
  }
}

export default HomeModal;