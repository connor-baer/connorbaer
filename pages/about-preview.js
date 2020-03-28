import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Anchor,
  Main,
  Header,
  Intro,
  Columns,
  Collage,
  Heading,
  Paragraph,
  Hr,
  styles,
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';

const Container = styled('div')(styles.pageWidth);

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

export default function AboutPage() {
  const title = 'I am Connor.';
  const subtitle =
    'I am web developer with a strong background in design, born in Germany and currently living in São Paulo. Nice to meet you 👋'; // eslint-disable-line max-len
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <Container>
          <StyledHeader title={title} subtitle={subtitle} />
        </Container>
        <Collage
          images={[
            {
              src: '/static/images/pages/connor.jpg',
              alt: 'Connor flashes a big smile at the camera.',
            },
            {
              src: '/static/images/pages/hackathon.jpg',
              alt: 'Connor flashes a big smile at the camera.',
            },
            {
              src: '/static/images/pages/beach.jpg',
              alt: 'Connor flashes a big smile at the camera.',
            },
          ]}
        />
        <Container>
          <Columns>
            <Intro>
              My roots lie in the field of design, however I ultimately found my
              passion in programming. The approach I take to my work is fun,
              fearless, and always forward-looking. My goal is to make
              technology more human.
            </Intro>

            <Intro>
              Technology should serve and delight its users without getting in
              the way. I always optimise for accessibility, usability, and
              performance to craft intuitive digital experiences for everyone.
            </Intro>
          </Columns>
          <Hr />
          <Heading as="h3">Experience</Heading>
          <Heading as="h4">
            Frontend Engineer — <Anchor href="https://sumup.com">SumUp</Anchor>
          </Heading>
          <Paragraph>
            My goal is to make technology more human. Technology should serve
            and delight its users without getting in the way. I always optimise
            for accessibility, usability, and performance to craft intuitive
            digital experiences for everyone.
          </Paragraph>
          <Heading as="h4">Web Developer & Designer — Freelance</Heading>
          <Paragraph>
            My goal is to make technology more human. Technology should serve
            and delight its users without getting in the way. I always optimise
            for accessibility, usability, and performance to craft intuitive
            digital experiences for everyone.
          </Paragraph>
          <Heading as="h3">Currently learning</Heading>
          <Heading as="h4">Reading</Heading>
          <Paragraph>Life of Pi</Paragraph>
          <Heading as="h4">Courses</Heading>
          <Paragraph>Udacity VR Foundations Nanodegree</Paragraph>
          <Anchor href="https://twitter.com/A_single_bear">
            <span role="img" aria-label="panda">
              🐼
            </span>
            I am a bear
          </Anchor>
        </Container>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
