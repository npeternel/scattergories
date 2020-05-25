import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomeModal = (props) => {
  const { handleClose, input, handleValue } = props;
  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" style={{ float: 'right' }} onClick={handleClose}>
          X
        </button>
        <h3>Enter Name</h3>
        <div style={{ textAlign: 'center' }}>
          <input type="text" style={{ margin: '1px 5px' }} value={input} onChange={(event) => handleValue(event)} />
          <Link to={{ pathname: '/game', name: input }}>
            <button type="button">Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

HomeModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  handleValue: PropTypes.func.isRequired
};

export default HomeModal;
