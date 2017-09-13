import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Meta } from 'layouts/Meta';
import { Navigation } from 'components/Navigation';
import { Header } from 'components/Header';
import { RecipeCard } from 'components/RecipeCard';
import { Footer } from 'components/Footer';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req }) {
    const { originalUrl, protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    const res = await fetch(`https://connorbaer.co/api/food/recipes.json`);
    const json = await res.json();
    const { data: recipes } = json;
    const isHome = !originalUrl;
    return { isHome, siteUrl, recipes };
  }

  render() {
    const { isHome, siteUrl, recipes } = this.props;
    return (
      <Meta title="Blog">
        <Navigation siteName="Connor Bär" siteUrl={siteUrl} isHome={isHome} />
        <Header
          title="Recipes"
          subtitle="My personal collection of delicious, exotic & healthy recipes."
        />
        <div className="cf l-ctnr">
          {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
        </div>
        <Prefooter
          text="Let’s be friends!"
          linkLabel="Say hi!"
          linkUrl="https://twitter.com/connor_baer"
        />
        <Footer />
      </Meta>
    );
  }
}
