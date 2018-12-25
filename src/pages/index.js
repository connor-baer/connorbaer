import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { flow, slice } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../services/posts';
import { getAllCookies } from '../services/cookies';

import Meta from '../components/Meta';
import Header from '../components/Header';
import PostCard from '../components/blog/PostCard';

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
    // eslint-disable-next-line max-len
    const subtitle =
      'I am a web developer with a strong background in design and a passion for accessibility, currently working as a frontend engineer at SumUp.'; // eslint-disable-line max-len
    const posts = flow(
      Posts.sortByDate,
      slice(0, 3)
    )(Posts.load());
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
