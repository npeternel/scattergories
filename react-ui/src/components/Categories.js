import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import Results from './Results';
import { phases } from '../phases';

class Categories extends React.Component {
  constructor() {
    super();
    this.inputs = {};
  }

  handleEnter = (event, i) => {
    if (event.keyCode === 13 || event.keyCode === 40) {
      this.inputs[(i + 1) % Object.keys(this.inputs).length].focus();
      event.preventDefault();
    }
    if (event.keyCode === 38 && i !== 0) {
      this.inputs[(i - 1) % Object.keys(this.inputs).length].focus();
      event.preventDefault();
    }
  }

  render() {
    const {
      categories,
      answers,
      results,
      phase,
      handleShuffle,
      handleValue
    } = this.props;
    const showShuffleBtn = phase === phases.RUNNING;
    const showResults = phase === phases.REVIEWING;
    const showCategoryList = phase !== phases.END;
    const showCategories = phase === phases.RUNNING || phase === phases.REVIEWING;
    return (
      <div className="categories">
        {showShuffleBtn ?
        (<div className="shuffle-btn">
          <button type="button" onClick={() => handleShuffle()}>
            Shuffle Categories
          </button>
        </div>
          ) : ''
        }
        {showCategoryList ?
          <div className="category-list">
            {showResults ? <h4>Results</h4> : '' }
            <ol>
              {categories.map((category, i) => (
                <li key={`li-${category}`}>
                  <div className="category-div">
                    <Category key={`${category}`} title={category} i={i} showCategories={showCategories} />
                    {showResults
                      ? <Results key={`${results[i]}`} result={results[i]} />
                      : (
                        <input
                          type="text"
                          onKeyDown={(event) => this.handleEnter(event, i)}
                          ref={(input) => { this.inputs[i] = input; }}
                          className="category-input"
                          value={answers[i] || ''}
                          onChange={(event) => handleValue(event, i)}
                        />
                      )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          : ''
        }
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  answers: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired,
  phase: PropTypes.string.isRequired,
  handleShuffle: PropTypes.func.isRequired,
  handleValue: PropTypes.func.isRequired
};

export default Categories;
