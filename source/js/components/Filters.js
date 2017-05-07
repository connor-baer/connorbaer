import React, { Component } from 'react'


class Filters extends Component {

  /**
   * Dynamically generate checkboxes
   */
  createCheckboxes(filter) {
    let name = Object.keys(filter)[0];

    return filter[name].map((option, index) => {
      return (
        <label key={index} htmlFor={option.toLowerCase()}>
          <input type="checkbox"
                 style={{display: 'none'}}
                 value={option.toLowerCase()}
                 id={option.toLowerCase()}
                 name={name}
                 checked={this.props.filterValues[name] === option.toLowerCase()}
                 onChange={this.props.onFilterChange.bind(this, name)}
                  />
          <span className="c-filter__option">{option}</span>
        </label>
      )
    });
  }

  /**
   * Render the search input
   * Render the filter checkboxes
   */
  render() {
    return (
      <div className="l-w100">
        <fieldset className="c-input c-input--search">
          <input
            type="search"
            placeholder="Search by name, ingredients, tags…"
            value={this.props.searchValue}
            onChange={this.props.onSearchChange}
            className="c-input__text"
          />
          <span className="c-input__highlight"></span>
        </fieldset>
        <fieldset className="c-input c-input--time">
          <input
            type="number"
            placeholder="Time…"
            value={this.props.timeValue}
            onChange={this.props.onTimeChange}
            className="c-input__text"
          />
          <span className="c-input__highlight"></span>
        </fieldset>
        {
          this.props.filters.map((filter, index) => {
            return (
              <fieldset key={index} className="c-filter">
                {
                  this.createCheckboxes(filter)
                }
              </fieldset>
            );
          })
        }
      </div>
    )
  }

}


export default Filters
