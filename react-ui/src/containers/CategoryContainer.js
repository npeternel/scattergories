import React from 'react';
import Categories from '../components/Categories';
import io from 'socket.io-client';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswers: true,
      showCategories: false,
      answers: {},
      categories: []
    }
  }

  componentDidMount() {
    this.socket = io('localhost:3001');
    this.socket.on('categories', (data) => {
      this.setState({
        showAnswers: this.state.showAnswers,
        showCategories: false,
        answers: {...this.state.answers},
        categories: data.categories
      });
    });
    this.socket.on('time', (data) => {
      this.setState({
        showAnswers: this.state.showAnswers,
        showCategories: data.running,
        answers: {...this.state.answers},
        categories: [...this.state.categories]
      });
    });
  }

  shuffleCategories = () => {
    this.socket.emit('categories:shuffle');
  }

  handleShowAnswers = () => {
    this.setState({
      answers: {...this.state.answers},
      showAnswers: !this.state.showAnswers,
      showCategories: this.state.showCategories,
      categories: [...this.state.categories]
    })
  }

  handleValue = (event, i) => {
    const tmp = {...this.state.answers};
    tmp[i] = event.target.value;
    this.setState({
      answers: tmp,
      showAnswers: this.state.showAnswers,
      showCategories: this.state.showCategories,
      categories: [...this.state.categories]
    })
  }

  render() {
    return (
      <div>
        <Categories state={this.state}
          handleShuffle={this.shuffleCategories}
          handleShowAnswers={this.handleShowAnswers}
          handleValue={this.handleValue}
        />
      </div>
    )
  }
}

export default CategoryContainer;