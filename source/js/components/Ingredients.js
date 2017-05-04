import React, { Component } from 'react'


class Ingredients extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      skill: '',
      serves: '',
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    var _this = this;

    const path = ( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1) );
    let url = '/api/food/recipe/' + path + '.json?measure=' + this.props.measure + '&people=' + this.props.measure;

    fetch(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        _this.setState({
          ingredients: json.data[0].ingredients,
          skill: json.data[0].skill,
          serves: json.data[0].serves
        });
      }).catch(function(ex) {
        console.warn('parsing failed', ex)
      })
  }

    /**
     * Dynamically generate ingredient list
     */
    createIngredients() {
      return this.state.ingredients.map((ingredient, index) => {
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

  render() {
    return (
      <div>
        <h3 className="c-sidebar__title">Ingredients</h3>
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
