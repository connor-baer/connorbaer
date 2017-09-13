import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Meta } from 'layouts/Meta';
import { Navigation } from 'components/Navigation';
import { Header } from 'components/Header';
import { RecipeCard } from 'components/RecipeCard';
import { Footer } from 'components/Footer';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query: { slug } }) {
    const { originalUrl, protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    const res = await fetch(
      `https://connorbaer.co/api/food/recipe/${slug}.json`
    );
    const json = await res.json();
    const { data: recipe } = json;
    const isHome = !originalUrl;
    return { isHome, siteUrl, recipe: recipe[0] };
  }

  render() {
    const { isHome, siteUrl, recipe } = this.props;
    return (
      <Meta title="Blog">
        <Navigation siteName="Connor Bär" siteUrl={siteUrl} isHome={isHome} />
        <Header
          title="Recipes"
          subtitle="My personal collection of delicious, exotic & healthy recipes."
        />
        <div className="cf l-ctnr">
          <RecipeCard recipe={recipe} />
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
