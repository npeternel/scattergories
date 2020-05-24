import React from 'react';
import Category from './Category';
import Results from './Results';

class Categories extends React.Component {

  constructor() {
    super();
    this.inputs = {};
  }

  handleEnter = (event, i) => {
    if (event.keyCode === 13 || event.keyCode === 40) {
      this.inputs[(i+1) % Object.keys(this.inputs).length].focus();
      event.preventDefault();
    }
    if (event.keyCode === 38 && i !== 0) {
      this.inputs[(i-1) % Object.keys(this.inputs).length].focus();
      event.preventDefault();
    }
  }

  render() {
    const {
      categories,
      answers,
      results,
      end
    } = this.props.state;
    return (
      <div className="categories">
        <div className="shuffle-btn">
        <button onClick={() => this.props.handleShuffle()}>
          Shuffle Categories
        </button>
        </div>
        <div className="category-list">
          <ol>
          {categories.map((category, i) => {
            return (
              <li key={i}>
                <div className="category-div">
                  <Category key={`${i}+++`} title={category} i={i} state={this.props.state}/>
                  { end ?
                    <Results key={`${i}+`} result={results[i]}/> :
                    <input onKeyDown={(event) => this.handleEnter(event, i)}
                    ref={(input) => this.inputs[i] = input} className="category-input"
                    value={answers[i] || ''} onChange={(event) => this.props.handleValue(event, i)}>
                    </input>
                  }
                </div>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Categories;