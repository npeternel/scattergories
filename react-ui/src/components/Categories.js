import React from 'react';
import Category from './Category';
import Answer from './Answer';
import Results from './Results';
import { v4 as uuidv4 } from 'uuid';

class Categories extends React.Component {

  render() {
    const {
      categories,
      showAnswers,
      answers,
      results,
      end
    } = this.props.state;
    console.log(`Result is ${answers[0]}`);
    return (
      <div>
        <ol>
        <button onClick={() => this.props.handleShuffle()}>
          Shuffle Categories
        </button>
          {categories.map((category, i) => {
            return (
              <li key={uuidv4()}>
                <div className="category-div">
                  <Category key={uuidv4()} title={category} i={i} state={this.props.state}/>
                  { end ?
                    <Results key={uuidv4()} result={results[i]}/> :
                    <Answer key={uuidv4()} i={i} value={answers[i]} handleValue={this.props.handleValue} showAnswers={showAnswers}/>
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