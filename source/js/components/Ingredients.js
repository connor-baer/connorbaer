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
        <label className="c-input__label">
          Serves
          <input
            type="number"
            placeholder="Persons"
            value={this.props.people}
            onChange={this.props.onPeopleChange}/>
        </label>
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
