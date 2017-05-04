import React, { Component } from 'react'
import { render } from 'react-dom'
import RecipeContainer from './components/RecipeContainer'


let initialState = {
  measure: "metric",
  people: 2
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    if (localStorage.getItem( 'state' )) {
      this.state = JSON.parse(localStorage.getItem( 'state' ));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem( 'state', JSON.stringify( this.state ));
  }

  render() {
    return <RecipeContainer measure={this.state.measure} people={this.state.people} />
  }

}

render(
  <App />,
  document.getElementById('app')
)
