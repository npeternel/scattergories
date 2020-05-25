import React from 'react';
import PropTypes from 'prop-types';
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
    };
  }

  componentDidMount() {
    this.socket.on('room', (data) => {
      const {
        answers, showCategories, end, results
      } = this.state;
      this.setState({
        showCategories,
        answers: { ...answers },
        categories: data.categories,
        end,
        results: { ...results }
      });
    });
    this.socket.on('categories', (data) => {
      const {
        answers, end, results
      } = this.state;
      this.setState({
        showCategories: false,
        answers: { ...answers },
        categories: data.categories,
        end,
        results: { ...results }
      });
    });
    this.socket.on('time', (data) => {
      const {
        answers, categories, end, results
      } = this.state;
      this.setState({
        showCategories: data.running,
        answers: { ...answers },
        categories: [...categories],
        end,
        results: { ...results }
      });
    });
    this.socket.on('game:start', () => {
      const {
        categories, results
      } = this.state;
      this.setState({
        showCategories: true,
        answers: {},
        categories: [...categories],
        end: false,
        results: { ...results }
      });
    });
    this.socket.on('time:end', () => {
      const {
        answers, categories, end, results
      } = this.state;
      this.setState({
        showCategories: true,
        answers: { ...answers },
        categories: [...categories],
        end,
        results: { ...results }
      });
      const answerCopy = { ...answers };
      for (let i = 0; i < categories.length; i += 1) {
        if (!answerCopy[i]) answerCopy[i] = '';
      }
      const { name } = this.props;
      this.socket.emit('answers', { name, id: this.socket.id, answers: answerCopy });
    });
    this.socket.on('answers:results', (results) => {
      const {
        answers, showCategories, categories
      } = this.state;
      this.setState({
        showCategories,
        answers: { ...answers },
        categories: [...categories],
        end: true,
        results
      });
    });
  }

  handleShuffle = () => {
    this.socket.emit('categories:shuffle');
  }

  handleShowAnswers = () => {
    const {
      answers, showCategories, categories, end, results
    } = this.state;
    this.setState({
      showCategories,
      answers: { answers },
      categories: [...categories],
      end,
      results: { ...results }
    });
  }

  handleValue = (event, i) => {
    const {
      answers, showCategories, categories, end, results
    } = this.state;
    const tmp = { ...answers };
    tmp[i] = event.target.value;
    this.setState({
      showCategories,
      answers: tmp,
      categories: [...categories],
      end,
      results: { ...results }
    });
  }

  render() {
    const {
      answers, showCategories, categories, end, results
    } = this.state;
    return (
      <Categories
        answers={answers}
        showCategories={showCategories}
        categories={categories}
        end={end}
        results={results}
        handleShuffle={this.handleShuffle}
        handleValue={this.handleValue}
      />
    );
  }
}

CategoryContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default CategoryContainer;
