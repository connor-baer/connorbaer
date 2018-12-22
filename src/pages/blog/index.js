import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import { getAllCookies } from '../../utils/cookies';
import * as Contentful from '../../api/contentful';

import Meta from '../../components/Meta';
import Header from '../../components/Header';
import PostCard from '../../components/blog/PostCard';

export default class Page extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static getInitialProps(ctx) {
    return Promise.all([
      getAllCookies(ctx),
      Contentful.getEntries({ locale: 'en-US', content_type: 'blogPost', include: 2 })
    ]).then(([cookies, posts]) => ({ cookies, posts }))
  }

  render() {
    const { title = 'Blog', posts = [] } = this.props;
    return (
      <Fragment>
        <Meta title={title} description="" />
        <Grid>
          <Row>
            <Col span={{ default: 12, tera: 10 }}>
              <Header title={title} />
            </Col>
          </Row>
          <Row>
            {posts.map((post, i) => (
              <Col key={i} span={{ default: 12, kilo: 6, mega: 4 }}>
                <PostCard {...post.fields} />
              </Col>
            ))}
          </Row>
        </Grid>
      </Fragment>
    );
  }
}
