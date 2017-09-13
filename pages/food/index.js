import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Site } from 'layouts/Site';
import { Main } from 'components/Main';
import { Header } from 'components/Header';
import { RecipeCard } from 'components/RecipeCard';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req }) {
    // const { protocol } = req || {};
    // const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const site = await fetch(`https://connorbaer.co/api/page/${query.slug}.json`)
    //   .then(res => res.json())
    //   .then(data => data[0]);
    const recipes = await fetch(`https://connorbaer.co/api/food/recipes.json`)
      .then(res => res.json())
      .then(json => json.data);
    const page = {
      title: 'Food',
      subtitle: 'My personal collection of delicious, exotic & healthy recipes.'
    };
    const site = {
      name: 'Connor Bär',
      domain: 'https://connorbaer.co/'
    };
    console.log(recipes);
    return { site, page, recipes };
  }

  render() {
    const { site, page, recipes } = this.props;
    const { title, subtitle } = page;
    return (
      <Site title={title} site={site}>
        <Main>
          <Header title={title} subtitle={subtitle} />
          <div className="cf l-ctnr">
            {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
          </div>
          <Prefooter
            text="Let’s be friends!"
            linkLabel="Say hi!"
            linkUrl="https://twitter.com/connor_baer"
          />
        </Main>
      </Site>
    );
  }
}
