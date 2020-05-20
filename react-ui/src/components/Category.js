import React from 'react';
import '../index.css';

class Categories extends React.Component {

  render() {
    return (
      <li>
        <div className="category-div">
          <p className="category-text">{this.props.title}</p>
          <input className="category-input">
          </input>
        </div>
      </li>
    )
  }
}

export default Categories;