import React, { Component } from 'react'
import Sidebar from './Sidebar'


class SidebarContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
  }

  /**
   * Get stored state from localStorage
   * Fetch recipe data
   */
  componentWillMount() {
    if (localStorage.getItem( 'sidebar' )) {
      let savedState = JSON.parse(localStorage.getItem( 'sidebar' ));

      this.setState(savedState);

      if (savedState.sidebar) {
        document.getElementById('js-body').classList.add('sidebar--open');
      }
    }
  }

  /**
   * Store state in localStorage
   *
   * @param  {object} prevProps
   * @param  {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem( 'sidebar', JSON.stringify( this.state ));
  }

  /**
   * Toggle the sidebar state
   */
  handleClick() {
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

  /**
   * Render the sidebar
   */
  render() {
    return (
      <Sidebar onClick={this.handleClick.bind(this)} />
    )
  }

}


export default SidebarContainer
