import React from 'react';
import '../index.css';

class Categories extends React.Component {

  render() {
    const {
      showCategories,
      showAnswers,
      value
    } = this.props.state;
    return (
      <li>
        <div className="category-div">
          <p className={showCategories ? "category-text" : "category-text-hidden"}>{this.props.title}</p>
          <input className={showAnswers ? "category-input" : "category-input-hidden"}
            value={value} onChange={(event) => this.props.handleValue(event, this.props.i)}>
          </input>
        </div>
      </li>
    )
  }
}

export default Categories;