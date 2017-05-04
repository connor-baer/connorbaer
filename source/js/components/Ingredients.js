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

  render() {
    return (
      <ul>
        {
          this.state.ingredients.map((ingredient, index) => {
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
