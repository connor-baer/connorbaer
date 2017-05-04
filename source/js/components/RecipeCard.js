import React, { Component } from 'react'
import Ingredients from './Ingredients'
import Directions from './Directions'


class RecipeCard extends Component {

  /**
   * Render single recipe
   */
  render() {
    let recipe = this.props.recipe;

    return (
      <a className="l-w33 fl-left" href={'/food/' + recipe.slug} title={recipe.title}>
        <article className="c-recipe">
          <figure className="c-recipe__image">
            <img className="o-image"
      					 src={recipe.image}
      					 alt={recipe.title} />
          </figure>
          <div className="c-recipe__content">
            <h3 className="c-recipe__title">{recipe.title}</h3>
            <p className="c-recipe__meta"><span><svg className="c-recipe__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>{recipe.totalTime} mins</span><span><svg className="c-recipe__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>{recipe.tags}</span></p>
          </div>
        </article>
      </a>
    )
  }

}


export default RecipeCard
