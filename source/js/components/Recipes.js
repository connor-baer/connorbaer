import React, { Component } from 'react'
import RecipeCard from './RecipeCard'


class Recipes extends Component {

  /**
   * State for recipes
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [{
        title: '',
        description: '',
        image: '',
        labels: '',
        ingredients: [],
        skill: '',
        totalTime: '',
        slug: ''
      }]
    };
  }

  /**
   * Fetch recipes with ajax
   */
  componentWillMount() {
    var _this = this;

    let url = '/api/food/recipes.json?measure=' + this.props.measure + '&people=' + this.props.measure;

    fetch(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        _this.setState({
          recipes: json.data
        });
      }).catch(function(ex) {
        console.warn('parsing failed', ex)
      })
  }

  /**
   * Render search and filter inputs
   * Render filtered recipes
   */
  render() {
    var _this = this;

    return (
      <div className="cf">
        {
          this.state.recipes.filter( function ( recipe ) {
            // Check if search matches title, ingredients or tags.
            let search = _this.props.searchValue.length === 0 || recipe.title.toLowerCase().indexOf( _this.props.searchValue.toLowerCase() ) > -1 || JSON.stringify(recipe.ingredients).toLowerCase().indexOf( _this.props.searchValue.toLowerCase() ) > -1 || recipe.labels.toLowerCase().indexOf( _this.props.searchValue.toLowerCase() ) > -1;

            // Check if categories match the filters.
            let checks = [];

            for (var key in _this.props.filterValues) {
              let check = (_this.props.filterValues[key].length === 0 || recipe.labels.toLowerCase().indexOf( _this.props.filterValues[key] ) > -1);

              checks.push(check);
            }

            // TODO: Check if time is shorter.
            // let time = _this.props.filterValues.time.length === 0 || Number(recipe.totalTime) <= 20;

            // Pass the item if it matches all filters.
            if (search && checks.every((check) => check)) {
              return true;
            }
            return false;
          } ).map((recipe, index) => {
            return (
              <RecipeCard key={index} recipe={recipe} />
            )
          })
        }
      </div>
    )
  }

}


export default Recipes
