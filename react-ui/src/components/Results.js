import React from 'react';
import '../index.css';

class Results extends React.Component {

  render() {
    const result = this.props.result || {};
    return (
      <div>
        {Object.keys(result).map((user, i) => 
        <p key={`${i}result`}>{user}: {result[user]}</p>
        )}
      </div>
    )
  }
}

export default Results;