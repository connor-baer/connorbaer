import React, { Component } from 'react'
import * as Utils from './Utils'
import Filters from './Filters'
import Recipes from './Recipes'


const filters = [
  { meal: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
  { time: ['20 mins'] },
  { main: ['Vegetarian', 'Meat', 'Fish'] },
  { origin: ['Asian', 'European', 'Latin American'] }
];


class RecipesContainer extends Component {

  /**
   * State for search and filter values
   */
  constructor(props) {
    super(props);
    // TODO: Dynamic filterValues
    this.state = {
      searchValue: '',
      filterValues: {
        meal: '',
        time: '',
        main: '',
        origin: ''
      }
    };
  }

  /**
   * Set search and filter values from hash
   */
  componentWillMount() {
    let hashParams = Utils.getHashParam();

    if (hashParams) {
      let hashSearch = hashParams.search;
      delete hashParams.search;
      let hashFilters = Object.assign({}, this.state.filterValues, hashParams);
      let newState = {
        searchValue: hashSearch ? hashSearch : '',
        filterValues: hashFilters ? hashFilters : {}
      };

      this.setState(newState);
    }
  }

  /**
   * Update search value state
   * Store search value in hash
   */
  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });

    Utils.setHashParam('search', event.target.value);
  }

  /**
   * Update filter value state
   * Store filter values in hash
   */
  handleFilterChange(name, event) {
    let value = event.target.value;
    let newValue = '';

    if (this.state.filterValues[name] !== value) {
      newValue = value;
    }

    let filters = Object.assign({}, this.state.filterValues, {[name]: newValue});

    this.setState({
      filterValues: filters
    });

    Utils.setHashParam(name, newValue);
  }

  /**
   * Render search and filter inputs
   * Render filtered recipes
   */
  render() {
    return (
      <div>
        <Filters
          searchValue={this.state.searchValue}
          onSearchChange={this.handleSearchChange.bind(this)}
          filters={filters}
          filterValues={this.state.filterValues}
          onFilterChange={this.handleFilterChange.bind(this)} />
        <Recipes
          searchValue={this.state.searchValue}
          filterValues={this.state.filterValues} />
      </div>
    )
  }

}


export default RecipesContainer
