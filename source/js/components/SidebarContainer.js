import React, { Component } from 'react'
import Sidebar from './Sidebar'


class SidebarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
  }

  render() {
    return (
      <Sidebar />
    )
  }

}

export default SidebarContainer
