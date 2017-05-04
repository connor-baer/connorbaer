import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ingredients from './Ingredients'


class Sidebar extends Component {

  render() {
    return (
      <div>
        <button className="c-sidebar__button" onClick={this.props.onClick}>
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M22,18A4,4 0 0,1 18,22H15A4,4 0 0,1 11,18V16H17.79L20.55,11.23L22.11,12.13L19.87,16H22V18M9,22H2C2,19 2,16 2.33,12.83C2.6,10.3 3.08,7.66 3.6,5H3V3H4L7,3H8V5H7.4C7.92,7.66 8.4,10.3 8.67,12.83C9,16 9,19 9,22Z" />
            </svg>
        </button>

        <div className="c-sidebar">
          <Tabs>
            <TabList className="c-metabar__navList">
              <Tab className="c-metabar__navLink">Ingredients</Tab>
              <Tab className="c-metabar__navLink">Groceries</Tab>
            </TabList>

            <TabPanel className="c-sidebar__content">
              <Ingredients />
            </TabPanel>
            <TabPanel className="c-sidebar__content">
              <h3 className="c-sidebar__title">Work in progress...</h3>
              <p>Soon you will be able to add recipe ingredients to a handy grocery list.</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    )
  }

}


export default Sidebar
