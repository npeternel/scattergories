import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeModal = (props) => {
  const { handleClose, name, handleName, handleJoin } = props;
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-btn-wrapper" >
          <button className="close-btn" type="button" onClick={handleClose}>X</button>
        </div>
        <h3>Enter Name</h3>
        <div className="input-wrapper" style={{ textAlign: 'center' }}>
          <input className="name-input" type="text" value={name} onChange={(event) => handleName(event)} />
          <Link to={{ pathname: '/game' }}>
            <button onClick={handleJoin} type="button">Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomeModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired,
  handleJoin: PropTypes.func.isRequired
};

export default HomeModal;
