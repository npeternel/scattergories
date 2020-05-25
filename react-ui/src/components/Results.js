import React from 'react';
import '../index.css';

const Results = (props) => {
  const { result } = props || {};
  const resultMap = result || {};
  return (
    <div className="results">
      {Object.keys(resultMap).map((user) => (
        <p key={`${resultMap[user].answer}-${new Date().getTime()}`} className={`result-${resultMap[user].type}`}>
          {`${user} : ${resultMap[user].answer}`}
        </p>
      ))}
    </div>
  );
};

export default Results;
