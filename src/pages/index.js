import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { getAllCookies } from '../utils/cookies';

import Meta from '../components/Meta';
import Header from '../components/Header';
import PostCard from '../components/blog/PostCard';

import { meta as soundOfSilence } from './blog/sound-of-silence/index.mdx';
import { meta as thisIsTheEuropeIAmProudOf } from './blog/this-is-the-europe-i-am-proud-of/index.mdx';
import { meta as africaIsNotACountry } from './blog/africa-is-not-a-country/index.mdx';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const title = this.props.title || 'Hello, I’m Connor.';
    const subtitle =
      'I am a web developer with a strong background in design and a passion for accessibility, currently working as a frontend engineer at SumUp.';
    const posts = [
      soundOfSilence,
      thisIsTheEuropeIAmProudOf,
      africaIsNotACountry
    ];
    return (
      <Fragment>
        <Meta title={title} description={subtitle} />
        <Grid>
          <Row>
            <Col span={{ default: 12, tera: 10 }}>
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
          <Row>
            {posts.map((post, i) => (
              <Col key={i} span={{ default: 12, kilo: 6, mega: 4 }}>
                <PostCard {...post} />
              </Col>
            ))}
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
