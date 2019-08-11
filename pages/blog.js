import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { flow, toLower } from 'lodash/fp';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/*.mdx';
import sortByDate from '../utils/sort-by-date';
import filterByCategory from '../utils/filter-by-category';
import * as Url from '../services/url';
import Navigation from '../components/Navigation';
import PreviewLarge from '../components/blog/PreviewLarge';
import { SITE_NAME, SITE_TWITTER } from '../constants';

const Grid = styled('div')(sharedStyles.pageWidth, sharedStyles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

export default function Blog({ category }) {
  const title = category || 'Blog';
  const path = category ? 'blog' : `blog/${toLower(category)}`;
  const url = Url.format(path, true);

  const sortedPosts = flow(
    filterByCategory(category),
    sortByDate()
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
          <Content>
            <Header title={title} />
            {sortedPosts.map(post => (
              <PreviewLarge
                {...post}
                key={post.__resourcePath}
                url={Url.format(post.__resourcePath)}
              />
            ))}
          </Content>
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
  category: PropTypes.string
};
