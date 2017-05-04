import React, { Component } from 'react'
import * as Utils from './Utils'
import Filters from './Filters'
import Recipes from './Recipes'


class RecipesContainer extends Component {

  /**
   * State for search and filter values
   */
  constructor(props) {
    super(props);
    // TODO: Dynamic filterValues
    this.state = {
      filters: [],
      searchValue: '',
      filterValues: {}
    };
  }

  /**
   * Set search and filter values from hash
   */
  componentWillMount() {
    this.fetchData();

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
   * Fetch the categories (filters)
   */
  fetchData() {
    var _this = this;

    let url = '/api/categories/food.json';

    fetch(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        let filterValues = {};

        json.data.map(function(group) {
          let key = Object.keys(group)[0];
          filterValues[key] = '';
        });

        _this.setState({
          filters: json.data,
          filterValues: filterValues
        });
      }).catch(function(ex) {
        console.warn('parsing failed', ex)
      })
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

    let newFilters = Object.assign({}, this.state.filterValues, {[name]: newValue});

    this.setState({
      filterValues: newFilters
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
          filters={this.state.filters}
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
