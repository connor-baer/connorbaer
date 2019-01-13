import React from 'react';
import PropTypes from 'prop-types';
import { find, flow } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Meta,
  Navigation,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

import * as Posts from '../../services/posts';
import PreviewLarge from '../../components/blog/PreviewLarge';
import * as CATEGORIES from '../../constants/categories';
import { SITE_NAME, SITE_TWITTER, NAV_LINKS } from '../../constants';
import { BASE_URL } from '../../constants/paths';

const grid = {
  span: { default: 12, kilo: 10, mega: 8 },
  skip: { default: 0, kilo: 1, mega: 2 }
};

function Blog({ category: categorySlug }) {
  const category = categorySlug && find({ slug: categorySlug }, CATEGORIES);

  const title = category ? category.name : 'Blog';
  const description = category ? category.description : '';
  const url = category
    ? `${BASE_URL}/blog`
    : `${BASE_URL}/blog/${categorySlug}`;

  const posts = flow(
    Posts.filterByCategory(category),
    Posts.sortByDate
  )(Posts.load());
  return (
    <>
      <Meta
        title={title}
        description={description}
        url={url}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation siteName={SITE_NAME} siteUrl={BASE_URL} links={NAV_LINKS} />
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
      <Prefooter
        text={'Let’s be friends.'}
        linkLabel={'Say hi!'}
        linkUrl={`https://twitter.com/${SITE_TWITTER}`}
      />
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER} />
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
