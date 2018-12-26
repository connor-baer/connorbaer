import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, flow } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../../services/posts';
import { getAllCookies } from '../../services/cookies';

import Meta from '../../components/Meta';
import Header from '../../components/Header';
import PreviewLarge from '../../components/blog/PreviewLarge';

import * as CATEGORIES from '../../constants/categories';

export default class Page extends Component {
  static propTypes = {
    slug: PropTypes.string
  };

  static getInitialProps(ctx) {
    const { slug } = ctx.query;
    const cookies = getAllCookies(ctx);
    return { cookies, slug };
  }

  render() {
    const { slug } = this.props;
    const category = find({ slug }, CATEGORIES);
    const { name, description } = category;
    const posts = flow(
      Posts.filterByCategory(category),
      Posts.sortByDate
    )(Posts.load());
    const url = '';
    return (
      <article>
        <Meta title={name} description={description} url={url} />
        <Grid>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              <Header title={name} subtitle={description} />
            </Col>
          </Row>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              {posts.map(post => (
                <PreviewLarge key={post.slug} {...post} />
              ))}
            </Col>
          </Row>
        </Grid>
      </article>
    );
  }
}
