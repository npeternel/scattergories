import React from 'react';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import { phases } from '../phases';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.socket = props.socket;

    this.state = {
      answers: {},
      categories: [],
      results: {},
      phase: phases.BEGINNING
    };
  }

  componentDidMount() {
    this.socket.on('game', (data) => {
      const {
        categories, results, phase
      } = data.game;
      let { answers } = this.state;
      const oldPhase = this.state.phase;
      if (oldPhase === phases.REVIEWING && phase === phases.BEGINNING) {
        answers = {};
      }
      this.setState({
        answers: { ...answers },
        categories,
        results,
        phase
      });
    });
    this.socket.on('time:end', () => {
      const {
        answers, categories, results
      } = this.state;
      this.setState({
        answers: { ...answers },
        categories: [...categories],
        results: { ...results },
        phase: phases.END
      });
      const answerCopy = { ...answers };
      for (let i = 0; i < categories.length; i += 1) {
        if (!answerCopy[i]) answerCopy[i] = '';
      }
      const { name } = this.props;
      this.socket.emit('answers', { name, id: this.socket.id, answers: answerCopy });
    });
  }

  handleShuffle = () => {
    this.socket.emit('categories:shuffle');
  }

  handleShowAnswers = () => {
    const {
      answers, categories, results, phase
    } = this.state;
    this.setState({
      answers: { answers },
      categories: [...categories],
      results: { ...results },
      phase
    });
  }

  handleValue = (event, i) => {
    const {
      answers, categories, results, phase
    } = this.state;
    const tmp = { ...answers };
    tmp[i] = event.target.value;
    this.setState({
      answers: tmp,
      categories: [...categories],
      results: { ...results },
      phase
    });
  }

  render() {
    const {
      answers, categories, results, phase
    } = this.state;
    return (
      <Categories
        answers={answers}
        categories={categories}
        results={results}
        phase={phase}
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
