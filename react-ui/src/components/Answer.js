import React from 'react';
import '../index.css';

class Answer extends React.Component {

  render() {
    return (
      <input className={this.props.showAnswers ? "category-input" : "category-input-hidden"}
        value={this.props.value} onChange={(event) => this.props.handleValue(event, this.props.i)}>
      </input>
    )
  }
}

export default Answer;