import React from 'react';
import '../index.css';

const Results = (props) => {
  const { result } = props || {};
  return (
    <div className="results">
      {Object.keys(result).map((user) => (
        <p key={`${result}-${new Date().getTime()}`} className={`result-${result[user].type}`}>
          {`${user} : ${result[user].answer}`}
        </p>
      ))}
    </div>
  );
};

export default Results;
