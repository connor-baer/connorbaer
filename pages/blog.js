import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { flow } from 'lodash/fp';
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
import * as Blog from '../services/blog';
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

export default function BlogPage({
  title = 'Blog',
  page = 0,
  category,
  archived = false
}) {
  const path = category ? 'blog' : `blog/${category}`;
  const url = Url.format(path, true);
  const showArchive = !archived && !category && page === 0;

  const sortedPosts = flow(
    Blog.filterByCategory(category),
    Blog.filterByArchived(archived),
    Blog.sortByDate(),
    Blog.paginate(page)
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
            <Header title={title} />{' '}
            {sortedPosts.map(post => (
              <PreviewLarge
                {...post}
                key={post.__resourcePath}
                url={Url.format(post.__resourcePath)}
              />
            ))}
            {showArchive && <Anchor href="/blog/archive">Archive →</Anchor>}
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

BlogPage.propTypes = {
  title: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string,
  archived: PropTypes.bool
};
