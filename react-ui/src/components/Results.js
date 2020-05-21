import React from 'react';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';

class Results extends React.Component {

  render() {
    console.log('Props:',this.props);
    return (
      <div>
        {Object.keys(this.props.result).map((user) => 
        <p key={uuidv4()}>{user}{this.props.result[user]}</p>
        )}
      </div>
    )
  }
}

export default Results;