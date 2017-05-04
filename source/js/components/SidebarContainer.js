import React, { Component } from 'react'
import Sidebar from './Sidebar'


class SidebarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
  }

  onClick() {
    let newState = this.state.sidebar ? false : true;

    this.setState({
      sidebar: newState
    });

    if (newState) {
      document.getElementById('js-body').classList.add('sidebar--open');
    } else {
      document.getElementById('js-body').classList.remove('sidebar--open');
    }
  }

  render() {
    return (
      <Sidebar onClick={this.onClick.bind(this)} />
    )
  }

}

export default SidebarContainer
