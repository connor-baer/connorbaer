import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import { Meta } from '../layouts/Meta';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Prefooter } from '../components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req }) {
    const { path, protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const res = await fetch(`${baseUrl}/api/slack`);
    // const json = await res.json();
    const isHome = !!path;
    return { isHome, siteUrl };
  }

  render() {
    const { isHome, siteUrl } = this.props;
    return (
      <Meta title="Welcome">
        <Navigation siteName="Connor Bär" siteUrl={siteUrl} isHome={isHome} />
        <div>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
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
