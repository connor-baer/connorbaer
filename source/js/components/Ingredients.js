import React, { Component } from 'react'


class Ingredients extends Component {

  /**
   * Dynamically generate ingredient list
   */
  createIngredients() {
    return this.props.ingredients.map((ingredient, index) => {
      return (
        <li key={index} className="o-ingredient">
          <label key={index} htmlFor={encodeURIComponent(ingredient)}>
            <input
              type="checkbox"
              className="o-ingredient__checkbox"
              value={ingredient}
              id={encodeURIComponent(ingredient)} />
            <span className="o-ingredient__text">{ingredient}</span>
          </label>
        </li>
      )
    });
  }

  /**
   * Render ingredients list
   */
  render() {
    return (
      <div>
        <h3 className="c-sidebar__title">Ingredients</h3>
        <fieldset>
          <label className="c-input__label">Serves</label>
          <input
            type="number"
            placeholder="Persons"
            className="c-input__text c-sidebar__serves"
            value={this.props.people}
            onChange={this.props.onPeopleChange} />
          <span className="c-input__highlight"></span>
          <button
            onClick={this.props.onMinusClick}
            className="c-sidebar__stepper">-</button>
          <button
            onClick={this.props.onPlusClick}
            className="c-sidebar__stepper">+</button>
        </fieldset>
        <ul>
          {
            this.createIngredients()
          }
        </ul>
      </div>
    )
  }

}


export default Ingredients
