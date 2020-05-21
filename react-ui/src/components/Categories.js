import React from 'react';
import Category from './Category';

class Categories extends React.Component {

  render() {
    const {
      categories,
      showAnswers
    } = this.props.state;
    return (
      <div>
        <ol>
        <button onClick={() => this.props.handleShuffle()}>
          Shuffle Categories
        </button>
          {categories.map((category, i) => 
            <Category key={i} title={category} i={i} state={this.props.state} handleValue={this.props.handleValue}/>
          )}
        <button onClick={() => this.props.handleShowAnswers()}>
          {showAnswers ? 'Cover Answers' : 'Show Answers' }
        </button>
        </ol>
      </div>
    )
  }
}

export default Categories;