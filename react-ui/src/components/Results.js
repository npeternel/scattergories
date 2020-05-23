import React from 'react';
import '../index.css';

class Results extends React.Component {

  render() {
    const result = this.props.result || {};
    console.log(result);
    return (
      <div className="results">
        {Object.keys(result).map((user, i) => 
        <p key={`${i}result`} className={`result-${result[user].type}`}>{user}: {result[user].answer}</p>
        )}
      </div>
    )
  }
}

export default Results;