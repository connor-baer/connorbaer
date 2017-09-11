import { Component } from 'react';
import Link from 'next/link';
import { Meta } from '../layouts/Meta';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Prefooter } from '../components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req }) {
    const { originalUrl, protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const res = await fetch(`${baseUrl}/api/slack`);
    // const json = await res.json();
    const isHome = !!originalUrl;
    return { isHome, siteUrl };
  }

  render() {
    const { isHome, siteUrl } = this.props;
    return (
      <Meta title="Blog">
        <Navigation siteName="Connor Bär" siteUrl={siteUrl} isHome={isHome} />
        <div>
          <Link href="/">
            <a>Home</a>
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
