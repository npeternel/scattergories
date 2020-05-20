import React from 'react';
import Category from './Category';

class Categories extends React.Component {

  render() {
    return (
      <div>
        <ul>
          {this.props.categories.map((category, i) => 
            <Category key={i} title={category} />
          )}
        </ul>
        <button onClick={() => this.props.handleClick()}>
          Shuffle Categories
        </button>
      </div>
    )
  }
}

export default Categories;