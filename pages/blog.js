import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Anchor, Main, Header, styles } from '@madebyconnor/bamboo-ui';

import { getPreview } from '../services/preview';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import PreviewLarge from '../components/blog/PreviewLarge';
import usePosts from '../hooks/use-posts';

const Grid = styled('div')(styles.pageWidth, styles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 1 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

export function getStaticProps(context) {
  return { props: { preview: getPreview(context) } };
}

export default function BlogPage({
  title = 'Blog',
  isArchived = false,
  category,
  page,
}) {
  const [posts] = usePosts({ isArchived, category, page });
  const pathname = category ? 'blog' : `blog/${category}`;
  const showArchive = !isArchived && !category && !(page > 1);

  return (
    <>
      <Meta title={title} pathname={pathname} />
      <Navigation />
      <Main>
        <Grid>
          <Content>
            <Header title={title} />{' '}
            {posts.map((post = {}) => (
              <PreviewLarge {...post} key={post.url} url={post.url} />
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
  isArchived: PropTypes.bool,
};
