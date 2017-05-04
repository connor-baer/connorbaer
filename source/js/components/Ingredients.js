import React, { Component } from 'react'


class Ingredients extends Component {

  render() {
    return (
      <ul>
        {
          this.props.ingredients.map((ingredient, index) => {
            return (
              <li key={index}>{ingredient}</li>
            )
          })
        }
      </ul>
    )
  }

}


export default Ingredients
