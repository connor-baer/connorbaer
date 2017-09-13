import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Site } from 'layouts/Site';
import { Main } from 'components/Main';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';
import { RecipeMeta } from 'components/RecipeMeta';
import { RecipeDirections } from 'components/RecipeDirections';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query }) {
    // const { protocol } = req || {};
    // const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const site = await fetch(`https://connorbaer.co/api/page/${query.slug}.json`)
    //   .then(res => res.json())
    //   .then(data => data[0]);
    const page = await fetch(
      `https://connorbaer.co/api/food/recipe/${query.slug}.json`
    )
      .then(res => res.json())
      .then(json => json.data[0]);
    const site = {
      name: 'Connor Bär',
      domain: 'https://connorbaer.co/'
    };
    return { site, page };
  }

  render() {
    const { site, page } = this.props;
    const { title, description, totalTime, skill, directions } = page;
    return (
      <Site title={title} site={site} sidebar>
        <Main>
          <Header title={title}>
            <RecipeMeta totalTime={totalTime} skill={skill} />
          </Header>

          <div className="l-ctnr">
            <div className="l-w100">
              <h3 className="c-recipe__description">{description}</h3>
              <RecipeDirections directions={directions} skill={skill} />
            </div>
          </div>

          <Prefooter
            text="Let’s be friends!"
            linkLabel="Say hi!"
            linkUrl="https://twitter.com/connor_baer"
          />
        </Main>
        <Sidebar>
          <Tabs>
            <TabList className="c-metabar__navList">
              <Tab className="c-metabar__navLink">Ingredients</Tab>
              <Tab className="c-metabar__navLink">Nutrition</Tab>
            </TabList>

            <TabPanel className="c-sidebar__content">
              <div>Hi</div>
            </TabPanel>
            <TabPanel className="c-sidebar__content">
              <h3 className="c-sidebar__title">Nutrition</h3>
              <p className="c-input__label">Per serving</p>
              <ul>
                <li>Work in progress...</li>
              </ul>
            </TabPanel>
          </Tabs>
        </Sidebar>
      </Site>
    );
  }
}
