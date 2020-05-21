import React from 'react';
import Category from './Category';
import Answer from './Answer';
import Results from './Results';

class Categories extends React.Component {

  render() {
    const {
      categories,
      showAnswers,
      answers,
      results,
      end
    } = this.props.state;
    return (
      <div>
        <ol>
        <button onClick={() => this.props.handleShuffle()}>
          Shuffle Categories
        </button>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                <div className="category-div">
                  <Category key={`${i}+++`} title={category} i={i} state={this.props.state}/>
                  { end ?
                    <Results key={`${i}+`} result={results[i]}/> :
                    <Answer key={`${i}++`} i={i} value={answers[i]} handleValue={this.props.handleValue} showAnswers={showAnswers}/>
                  }
                </div>
              </li>
            )
          })}
        <button onClick={() => this.props.handleShowAnswers()}>
          {showAnswers ? 'Cover Answers' : 'Show Answers' }
        </button>
        </ol>
      </div>
    )
  }
}

export default Categories;