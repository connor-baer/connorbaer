import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Ingredients from './Ingredients'
import Directions from './Directions'


class Sidebar extends Component {

  render() {
    let recipe = this.props.recipe;

    return (
      <Tabs>
        <TabList>
          <Tab>Ingredients</Tab>
          <Tab>Groceries</Tab>
        </TabList>

        <TabPanel>
          <Ingredients />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    )
  }

}


export default Sidebar
