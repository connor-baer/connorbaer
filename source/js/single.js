import React, { Component } from 'react'
import { render } from 'react-dom'
import SidebarContainer from './components/SidebarContainer'


// Set some sane defaults
let initialState = {
  measure: "metric",
  people: 2
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /**
   * Get stored state from localStorage
   */
  componentWillMount() {
    if (localStorage.getItem( 'state' )) {
      this.state = JSON.parse(localStorage.getItem( 'state' ));
    }
  }

  /**
   * Store state in localStorage
   *
   * @param  {object} prevProps
   * @param  {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem( 'state', JSON.stringify( this.state ));
  }

  render() {
    return <SidebarContainer measure={this.state.measure} people={this.state.people} />
  }

}

render(
  <App />,
  document.getElementById('app')
)
