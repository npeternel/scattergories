import React from 'react';
import Categories from '../components/Categories';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;

    this.state = {
      showCategories: false,
      answers: {},
      categories: [],
      end: false,
      results: {}
    }
  }

  componentDidMount() {
    this.socket.on('room', (data) => {
      this.setState({
        showCategories: this.state.showCategories,
        answers: {...this.state.answers},
        categories: data.categories,
        end: this.state.end,
        results: {...this.state.results}
      });
    });
    this.socket.on('categories', (data) => {
      this.setState({
        showCategories: false,
        answers: {...this.state.answers},
        categories: data.categories,
        end: this.state.end,
        results: {...this.state.results}
      });
    });
    this.socket.on('time', (data) => {
      this.setState({
        showCategories: data.running,
        answers: {...this.state.answers},
        categories: [...this.state.categories],
        end: this.state.end,
        results: {...this.state.results}
      });
    });
    this.socket.on('game:start', () => {
      this.setState({
        showCategories: true,
        answers: {},
        categories: [...this.state.categories],
        end: false,
        results: {...this.state.results}
      });
    });
    this.socket.on('time:end', () => {
      this.setState({
        showCategories: true,
        answers: {...this.state.answers},
        categories: [...this.state.categories],
        end: this.state.end,
        results: {...this.state.results}
      });
      const answerCopy = {...this.state.answers};
      for (let i = 0; i < this.state.categories.length; i++) {
        if (!answerCopy[i]) answerCopy[i] = '';
      }
      this.socket.emit('answers', {name: this.props.name, id: this.socket.id, answers: answerCopy });
    });
    this.socket.on('answers:results', (results) => {
      this.setState({
        showCategories: this.state.showCategories,
        answers: {...this.state.answers},
        categories: [...this.state.categories],
        end: true,
        results: results
      });
    });
  }

  shuffleCategories = () => {
    this.socket.emit('categories:shuffle');
  }

  handleShowAnswers = () => {
    this.setState({
      showCategories: this.state.showCategories,
      answers: {...this.state.answers},
      categories: [...this.state.categories],
      end: this.state.end,
      results: {...this.state.results}
    });
  }

  handleValue = (event, i) => {
    const tmp = {...this.state.answers};
    tmp[i] = event.target.value;
    this.setState({
      showCategories: this.state.showCategories,
      answers: tmp,
      categories: [...this.state.categories],
      end: this.state.end,
      results: {...this.state.results}
    });
  }

  render() {
    return (
      <Categories
        state={this.state}
        handleShuffle={this.shuffleCategories}
        handleValue={this.handleValue}
      />
    )
  }
}

export default CategoryContainer;