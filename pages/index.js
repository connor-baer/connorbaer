import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash/fp';
import { Main, Header, Slider, sharedStyles } from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import PreviewSmall from '../components/blog/PreviewSmall';
import GuideSmall from '../components/travel/GuideSmall';

import usePosts from '../hooks/use-posts';
import useCities from '../hooks/use-cities';

const Container = styled('div')(sharedStyles.pageWidth);

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

  const [posts] = usePosts({ skip: 3 });
  const [cities] = useCities({ skip: 4 });

  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        pathname={''}
        image={{
          src: '/static/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera',
        }}
      />
      <Navigation />
      <Main>
        <Container>
          <StyledHeader title={title} subtitle={subtitle} />
        </Container>

        {!isEmpty(posts) && (
          <Container>
            <SectionHeading>Recent posts</SectionHeading>
            <Posts>
              {posts.map((post) => (
                <PostPreview
                  url={post.url}
                  key={post.title}
                  length={posts.length}
                  {...post}
                />
              ))}
            </Posts>
          </Container>
        )}

        {!isEmpty(cities) && (
          <>
            <Container>
              <SectionHeading>City guides</SectionHeading>
            </Container>

            <Slider css={(theme) => sharedStyles.pageWidth({ theme })}>
              {cities.map((city) => (
                <GuideSmall key={city.title} url={city.url} {...city} />
              ))}
            </Slider>
          </>
        )}
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
