import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Main,
  Header,
  Intro,
  Columns,
  Collage,
  Heading,
  Paragraph,
  Hr,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';

const Grid = styled('div')(sharedStyles.pageWidth, sharedStyles.grid);

const headerStyles = theme => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 11;
  }
`;

const columStyles = () => css`
  grid-column: 1 / 13;
`;

export default function AboutPage() {
  const title = 'I am Connor.';
  const subtitle =
    'I am web developer with a strong background in design, born in Germany and currently living in Berlin. Nice to meet you 👋'; // eslint-disable-line max-len
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <Grid>
          <Header title={title} subtitle={subtitle} css={headerStyles} />
        </Grid>
        <Collage
          images={[
            {
              src: '/static/images/pages/connor.jpg',
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            },
            {
              src: '/static/images/pages/hackathon.jpg',
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            },
            {
              src: '/static/images/pages/beach.jpg',
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            }
          ]}
        />
        <Grid>
          <Columns css={columStyles}>
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
          <Heading as="h4">Frontend Engineer — SumUp Services</Heading>
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
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
