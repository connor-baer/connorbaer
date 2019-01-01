import React from 'react';
import PropTypes from 'prop-types';
import { find, flow } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../../services/posts';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import Main from '../../components/Main';
import Header from '../../components/Header';
import Prefooter from '../../components/Prefooter';
import Footer from '../../components/Footer';
import PreviewLarge from '../../components/blog/PreviewLarge';

import * as CATEGORIES from '../../constants/categories';

const grid = {
  span: { default: 12, kilo: 10, mega: 8 },
  skip: { default: 0, kilo: 1, mega: 2 }
};

function Blog({ category: categorySlug }) {
  const category = categorySlug && find({ slug: categorySlug }, CATEGORIES);

  const title = category ? category.name : 'Blog';
  const description = category ? category.description : '';
  // FIXME: Construct URL
  const url = '';

  const posts = flow(
    Posts.filterByCategory(category),
    Posts.sortByDate
  )(Posts.load());
  return (
    <>
      <Meta title={title} description={description} url={url} />
      <Navigation />
      <Main>
        <Grid>
          <Row>
            <Col {...grid}>
              <Header title={title} />
            </Col>
          </Row>
          <Row>
            <Col {...grid}>
              {posts.map(post => (
                <PreviewLarge key={post.slug} {...post} />
              ))}
            </Col>
          </Row>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}

Blog.propTypes = {
  category: PropTypes.string
};

Blog.getInitialProps = ctx => {
  const { category } = ctx.query;
  return { category };
};

export default Blog;
