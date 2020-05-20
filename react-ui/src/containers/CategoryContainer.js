import React from 'react';
import Categories from '../components/Categories';
import io from 'socket.io-client';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    this.socket = io('localhost:3001');
    this.socket.on('categories', (data) => {
      this.setState({
        categories: data.categories
      });
    });
  }

  shuffleCategories = () => {
    this.socket.emit('categories:shuffle');
  }

  render() {
    return (
      <div>
        <Categories categories={this.state.categories} handleClick={this.shuffleCategories}/>
      </div>
    )
  }
}

export default CategoryContainer;