import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { flow, slice } from 'lodash/fp';
import { Main, Header, Slider, sharedStyles } from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/*.mdx';
// eslint-disable-next-line import/no-unresolved
import { frontMatter as guides } from './travel/guides/*.mdx';
import * as Blog from '../services/blog';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import PreviewSmall from '../components/blog/PreviewSmall';
import GuidePreview from '../components/travel/GuidePreview';

import * as Url from '../services/url';

const Grid = styled('div')(sharedStyles.pageWidth);

const headerStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.mega} {
    width: 90%;
  }

  ${theme.mq.giga} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const postsStyles = ({ theme }) => css`
  display: flex;
  flex-wrap: wrap;

  ${theme.mq.mega} {
    flex-wrap: nowrap;
  }
`;

const Posts = styled('div')(postsStyles);

const postStyles = ({ theme, length }) => css`
  width: 100%;

  ${theme.mq.mega} {
    width: calc(50% - ${theme.spacings.mega});
    margin-right: ${theme.spacings.tera};
  }

  ${theme.mq.giga} {
    width: ${(100 / length).toFixed(2)}%;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const PostPreview = styled(PreviewSmall)(postStyles);

export default function HomePage() {
  const title = 'Hello, I’m Connor.';
  const subtitle =
    'Avid rock climber, scuba diver, and cooking enthusiast. Currently frontend engineer at SumUp.'; // eslint-disable-line max-len

  const sortedPosts = flow(
    Blog.filterByArchived(),
    Blog.sortByDate(),
    slice(0, 3)
  )(posts);

  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        pathname={''}
        image={{
          src: '/static/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera'
        }}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledHeader title={title} subtitle={subtitle} />

          <Posts>
            {sortedPosts.map(post => (
              <PostPreview
                url={Url.format(post.__resourcePath)}
                key={post.title}
                length={sortedPosts.length}
                {...post}
              />
            ))}
          </Posts>
        </Grid>

        <Slider css={theme => sharedStyles.pageWidth({ theme })}>
          {guides.map(guide => (
            <GuidePreview
              key={guide.title}
              url={Url.format(guide.__resourcePath)}
              {...guide}
            />
          ))}
        </Slider>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
