import React from 'react';
import PropTypes from 'prop-types';
import { flow, toLower } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/**/index.mdx';
import sortByDate from '../utils/sort-by-date';
import filterByCategory from '../utils/filter-by-category';
import * as Url from '../services/url';
import Navigation from '../components/Navigation';
import PreviewLarge from '../components/blog/PreviewLarge';
import { SITE_NAME, SITE_TWITTER } from '../constants';

const grid = {
  span: { default: 12, kilo: 10, mega: 8 },
  skip: { default: 0, kilo: 1, mega: 2 }
};

export default function Blog({ baseUrl, category }) {
  const title = category || 'Blog';
  const path = category ? 'blog' : `blog/${toLower(category)}`;
  const url = Url.format(baseUrl, path);

  const sortedPosts = flow(
    filterByCategory(category),
    sortByDate
  )(posts);
  return (
    <>
      <Meta
        title={title}
        url={url}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
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
              {sortedPosts.map(post => (
                <PreviewLarge
                  {...post}
                  key={post.__resourcePath}
                  url={Url.format(baseUrl, post.__resourcePath)}
                />
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
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER}>
        <Anchor href="/disclaimer">Disclaimer</Anchor>
      </Footer>
    </>
  );
}

Blog.propTypes = {
  baseUrl: PropTypes.string,
  category: PropTypes.string
};

Blog.getInitialProps = ctx => {
  const { category } = ctx.query;
  return { category };
};
