import React, { Component } from 'react';
import { render } from 'react-dom';
import RecipesContainer from './components/RecipesContainer';

// Set some sane defaults
let defaultState = {
  measure: 'metric',
  people: 2
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  /**
   * Get stored state from localStorage
   */
  componentWillMount() {
    if (localStorage.getItem('state')) {
      this.state = JSON.parse(localStorage.getItem('state'));
    }
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

  render() {
    return (
      <RecipesContainer
        measure={this.state.measure}
        people={this.state.people}
      />
    );
  }
}

render(<App />, document.getElementById('app'));
