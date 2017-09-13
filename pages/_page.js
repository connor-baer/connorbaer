import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Site } from 'layouts/Site';
import { Main } from 'components/Main';
import { Header } from 'components/Header';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query }) {
    const { protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    // const site = await fetch(`https://connorbaer.co/api/page/${query.slug}.json`)
    //   .then(res => res.json())
    //   .then(data => data[0]);
    const page = await fetch(
      `https://connorbaer.co/api/page/${query.slug}.json`
    )
      .then(res => res.json())
      .then(data => data[0]);
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

          <div className="l-ctnr">
            <div className="l-w100">
              <p>hi</p>
            </div>
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
