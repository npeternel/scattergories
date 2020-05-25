import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';
import Results from './Results';

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
      showCategories,
      categories,
      answers,
      results,
      end,
      handleShuffle,
      handleValue
    } = this.props;
    return (
      <div className="categories">
        <div className="shuffle-btn">
          <button type="button" onClick={() => handleShuffle()}>
            Shuffle Categories
          </button>
        </div>
        <div className="category-list">
          <ol>
            {categories.map((category, i) => (
              <li key={`li-${category}-${new Date().getTime()}`}>
                <div className="category-div">
                  <Category key={`${category}-${new Date().getTime()}`} title={category} i={i} showCategories={showCategories} />
                  { end
                    ? <Results key={`result-${category}-${new Date().getTime()}`} result={results[i]} />
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
      </div>
    );
  }
}

Categories.propTypes = {
  showCategories: PropTypes.bool.isRequired,
  categories: PropTypes.isRequired,
  answers: PropTypes.isRequired,
  results: PropTypes.isRequired,
  end: PropTypes.bool.isRequired,
  handleShuffle: PropTypes.func.isRequired,
  handleValue: PropTypes.func.isRequired
};

export default Categories;
