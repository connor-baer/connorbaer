import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Site } from 'layouts/Site';
import { Main } from 'components/Main';
import { Header } from 'components/Header';
import { Link } from 'components/Link';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query }) {
    // const { protocol } = req || {};
    // const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const site = await fetch(`https://connorbaer.co/api/page/${query.slug}.json`)
    //   .then(res => res.json())
    //   .then(data => data[0]);
    // const page = await fetch(`https://connorbaer.co/api/single/${query.slug}.json`)
    //   .then(res => res.json())
    //   .then(data => data[0]);
    const page = {
      title: 'Blog'
    };
    const site = {
      name: 'Connor Bär',
      domain: 'https://connorbaer.co/'
    };
    return { site, page };
  }

  render() {
    const { site, page } = this.props;
    const { title, subtitle } = page;
    return (
      <Site title={title} site={site}>
        <Main>
          <Header title={title} subtitle={subtitle} />
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
        </Main>
      </Site>
    );
  }
}
