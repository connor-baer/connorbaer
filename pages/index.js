import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash/fp';
import { Main, Header, Slider, styles } from '@madebyconnor/bamboo-ui';

import { getPreview } from '../services/preview';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import SectionHeading from '../components/SectionHeading';
import PreviewSmall from '../components/blog/PreviewSmall';
import GuideSmall from '../components/travel/GuideSmall';
import usePosts from '../hooks/use-posts';
import useCities from '../hooks/use-cities';

const Container = styled('div')(styles.pageWidth);

const headerStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.lap} {
    width: 90%;
  }

  ${theme.mq.desk} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const postsStyles = ({ theme }) => css`
  display: flex;
  flex-wrap: wrap;

  ${theme.mq.lap} {
    flex-wrap: nowrap;
  }
`;

const Posts = styled('div')(postsStyles);

const postStyles = ({ theme, length }) => css`
  width: 100%;

  ${theme.mq.lap} {
    width: calc(50% - ${theme.spacing.m});
    margin-right: ${theme.spacing.xl};
  }

  ${theme.mq.desk} {
    width: ${(100 / length).toFixed(2)}%;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const PostPreview = styled(PreviewSmall)(postStyles);

export function getStaticProps(context) {
  return { props: { preview: getPreview(context) } };
}

export default function HomePage() {
  const title = 'Hello, I’m Connor.';
  const subtitle =
    'Avid rock climber, scuba diver, and cooking enthusiast. Currently frontend engineer at SumUp.';

  const [posts] = usePosts({ skip: 3 });
  const [cities] = useCities({ skip: 4 });

  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        pathname={''}
        image={{
          src: '/images/pages/connor.jpg',
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

            <Slider css={styles.pageWidth}>
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
