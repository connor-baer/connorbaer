import React, { Component } from 'react'
import Recipe from './Recipe'


class RecipeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        title: '',
        description: '',
        label: '',
        tags: '',
        ingredients: [],
        directions: [],
        skill: '',
        serves: '',
        totalTime: '',
        slug: ''
      }
    };
  }

  componentWillMount() {
    var _this = this;

    const path = ( window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1) );
    let url = '/api/food/recipe/' + path + '.json?measure=' + this.props.measure + '&people=' + this.props.measure;

    fetch(url)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        _this.setState({
          recipe: json.data[0]
        });
      }).catch(function(ex) {
        console.warn('parsing failed', ex)
      })
  }

  render() {
    return (
      <Recipe recipe={this.state.recipe} />
    )
  }

}

export default RecipeContainer
