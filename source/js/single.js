import React, { Component } from 'react'
import { render } from 'react-dom'
import SidebarContainer from './components/SidebarContainer'


class App extends Component {

  /**
   * Render the app
   */
  render() {
    return <SidebarContainer />
  }

}

render(
  <App />,
  document.getElementById('app')
)
