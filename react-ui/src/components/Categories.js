import React from 'react';
import Category from './Category';
import Results from './Results';

class Categories extends React.Component {

  constructor() {
    super();
    this.inputs = [];
  }

  handleEnter = (event, i) => {
    if (event.keyCode === 13 || event.keyCode === 40) {
      this.inputs[(i+1) % this.inputs.length].focus();
      event.preventDefault();
    }
    if (event.keyCode === 38 && i !== 0) {
      this.inputs[(i-1) % this.inputs.length].focus();
      event.preventDefault();
    }
  }

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
        <button onClick={() => this.props.handleShuffle()}>
          Shuffle Categories
        </button>
          <ol>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                <div className="category-div">
                  <Category key={`${i}+++`} title={category} i={i} state={this.props.state}/>
                  { end ?
                    <Results key={`${i}+`} result={results[i]}/> :
                    <input onKeyDown={(event) => this.handleEnter(event, i)}
                    ref={(input) => this.inputs.push(input)} className={showAnswers ? "category-input" : "category-input-hidden"}
                    value={answers[i] || ''} onChange={(event) => this.props.handleValue(event, i)}>
                    </input>
                  }
                </div>
              </li>
            )
          })}
          </ol>
        <button onClick={() => this.props.handleShowAnswers()}>
          {showAnswers ? 'Cover Answers' : 'Show Answers' }
        </button>
      </div>
    )
  }
}

export default Categories;