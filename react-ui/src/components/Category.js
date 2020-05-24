import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

const Category = (props) => {
  const {
    showCategories,
    title
  } = props;
  return (
    <p className={showCategories ? 'category-text' : 'category-text-hidden'}>{title}</p>
  );
};

Category.propTypes = {
  showCategories: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default Category;
