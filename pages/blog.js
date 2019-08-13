import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { flow } from 'lodash/fp';
import { Anchor, Main, Header, sharedStyles } from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/*.mdx';
import * as Blog from '../services/blog';
import * as Url from '../services/url';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import PreviewLarge from '../components/blog/PreviewLarge';

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
  const pathname = category ? 'blog' : `blog/${category}`;
  const showArchive = !archived && !category && page === 0;

  const sortedPosts = flow(
    Blog.filterByCategory(category),
    Blog.filterByArchived(archived),
    Blog.sortByDate(),
    Blog.paginate(page)
  )(posts);

  return (
    <>
      <Meta title={title} pathname={pathname} />
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
      <Prefooter />
      <Footer />
    </>
  );
}

BlogPage.propTypes = {
  title: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string,
  archived: PropTypes.bool
};
