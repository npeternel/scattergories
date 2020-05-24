import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

class HomeModal extends React.Component {

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <button style={{float: 'right'}} onClick={this.props.handleClose}>
            X
          </button>
          <h3>Enter Name</h3>
          <div style={{'textAlign': 'center'}}>
            <input style={{'margin': '1px 5px'}}value={this.props.input} onChange={(event) => this.props.handleValue(event)}>
            </input>
            <Link to={{pathname:'/game', name:this.props.input}}>Go</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeModal;