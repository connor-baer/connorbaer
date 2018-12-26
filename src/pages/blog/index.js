import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../../services/posts';
import { getAllCookies } from '../../services/cookies';

import Meta from '../../components/Meta';
import Header from '../../components/Header';
import PreviewLarge from '../../components/blog/PreviewLarge';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    const cookies = getAllCookies(ctx);
    return { cookies };
  }

  render() {
    const posts = Posts.load();
    const sortedPosts = Posts.sortByDate(posts);
    const { title = 'Blog' } = this.props;
    return (
      <Fragment>
        <Meta title={title} />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              <Header title={title} />
            </Col>
          </Row>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              {sortedPosts.map(post => (
                <PreviewLarge key={post.slug} {...post} />
              ))}
            </Col>
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
