import React, { Component } from 'react'
import Ingredients from './Ingredients'
import Directions from './Directions'


class Recipe extends Component {

  render() {
    let recipe = this.props.recipe;

    return (
      <div>
        <header className="c-header">
          <h1 className="c-header__title c-header__title--color">{recipe.title}&nbsp;</h1>
        </header>
        <Ingredients ingredients={recipe.ingredients} />
        <h3 className="c-blocks__title">{recipe.description}</h3>
        <Directions directions={recipe.directions} />
      </div>
    )
  }

}


export default Recipe
