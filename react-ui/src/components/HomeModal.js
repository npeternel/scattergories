import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeModal = (props) => {
  const { handleClose, name, handleName } = props;
  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" className="close-btn" onClick={handleClose}>
          X
        </button>
        <h3>Enter Name</h3>
        <div style={{ textAlign: 'center' }}>
          <input type="text" style={{ margin: '1px 5px' }} value={name} onChange={(event) => handleName(event)} />
          <Link to={{ pathname: '/game' }}>
            <button type="button">Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomeModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  handleName: PropTypes.func.isRequired
};

export default HomeModal;
