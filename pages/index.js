import { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Site } from 'layouts/Site';
import { Main } from 'components/Main';
import { Header } from 'components/Header';
import { Link } from 'components/Link';
import { PostCard } from 'components/PostCard';
import { Prefooter } from 'components/Prefooter';

export default class Page extends Component {
  static async getInitialProps({ req, query }) {
    const { protocol } = req || {};
    const siteUrl = req ? `${protocol}://${req.get('Host')}` : '';
    const site = await fetch(
      `https://connorbaer.co/api/page/${query.slug}.json`
    )
      .then(res => res.json())
      .then(json => json.data)
      .catch(err => {
        console.log(err);
        return {
          name: 'Connor Bär',
          domain: 'https://connorbaer.co/'
        };
      });
    const page = await fetch(
      `https://connorbaer.co/api/single/${query.slug}.json`
    )
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        return {
          title: 'Hello, I’m Connor.',
          subtitle:
            'I am a web developer with a strong background in design, born in Germany and currently working as a Junior Frontend Engineer at SumUp.'
        };
      });
    const posts = await fetch(`https://connorbaer.co/api/posts.json`)
      .then(res => res.json())
      .then(json => json.data)
      .catch(err => {
        console.log(err);
        return [];
      });

    return { site, page, posts };
  }

  render() {
    const { site, page, posts } = this.props;
    const { title, subtitle } = page;
    return (
      <Site title={title} site={site}>
        <Main>
          <Header title={title} subtitle={subtitle} />
          <div className="l-ctnr cf">
            {posts.map((post, i) => <PostCard post={post} key={i} />)}
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
