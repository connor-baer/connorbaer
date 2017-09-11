import React, { Component } from 'react';
import Ingredients from './Ingredients';

class IngredientsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [''],
      nutritions: {},
      people: '2'
    };
  }

  /**
   * Get stored state from localStorage
   * Fetch recipe data
   */
  componentWillMount() {
    if (localStorage.getItem('state')) {
      this.setState(
        JSON.parse(localStorage.getItem('state')),
        this.fetchData(this.state.measure, this.state.people)
      );
    }
  }

  /**
   * Fetch data with new state
   *
   * @param  {object} nextProps
   * @param  {object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    let people = nextState.people === '' ? this.state.people : nextState.people;

    this.fetchData(people);
  }

  /**
   * Store state in localStorage
   *
   * @param  {object} prevProps
   * @param  {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  /**
   * Fetch ingredients, other meta data
   */
  fetchData(people) {
    var _this = this;

    let path = window.location.pathname.substr(
      window.location.pathname.lastIndexOf('/') + 1
    );
    let url =
      '/api/food/recipe/' +
      path +
      '.json?measure=metric&people=' +
      this.state.people;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        _this.setState({
          ingredients: json.data[0].ingredients,
          nutritions: json.data[0].nutritions
        });
      })
      .catch(function(ex) {
        console.warn('parsing failed', ex);
      });
  }

  /**
   * Update people state
   */
  handlePeopleChange(event) {
    this.setState({
      people: event.target.value
    });
  }

  /**
   * Decrease people state
   */
  handleMinusClick(event) {
    let minus = (Number(this.state.people) - 1).toString();

    this.setState({
      people: minus
    });
  }

  /**
   * Increase people state
   */
  handlePlusClick(event) {
    let plus = (Number(this.state.people) + 1).toString();

    this.setState({
      people: plus
    });
  }

  /**
   * Render ingredients list
   */
  render() {
    return (
      <Ingredients
        ingredients={this.state.ingredients}
        people={this.state.people}
        onPeopleChange={this.handlePeopleChange.bind(this)}
        onMinusClick={this.handleMinusClick.bind(this)}
        onPlusClick={this.handlePlusClick.bind(this)}
      />
    );
  }
}

export default IngredientsContainer;
