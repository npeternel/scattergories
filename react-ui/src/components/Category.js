import React from 'react';
import '../index.css';

class Category extends React.Component {

  render() {
    const {
      showCategories,
    } = this.props.state;
    return (
      <p className={showCategories ? "category-text" : "category-text-hidden"}>{this.props.title}</p>
    )
  }
}

export default Category;