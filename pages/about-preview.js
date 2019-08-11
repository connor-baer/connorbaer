import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Meta,
  Navigation,
  Main,
  Header,
  Prefooter,
  Footer,
  Intro,
  Columns,
  Collage,
  Hr,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

const TITLE = 'I am Connor.';
const SUBTITLE =
  'I am web developer with a strong background in design, born in Germany and currently living in Berlin. Nice to meet you 👋'; // eslint-disable-line max-len

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

const Text = styled('p');
const Heading = styled('h2');

export default function About() {
  return (
    <>
      <Meta title={TITLE} description={SUBTITLE} />
      <Navigation />
      <Main>
        <Grid>
          <Header title={TITLE} subtitle={SUBTITLE} css={headerStyles} />
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
          <Text>
            My goal is to make technology more human. Technology should serve
            and delight its users without getting in the way. I always optimise
            for accessibility, usability, and performance to craft intuitive
            digital experiences for everyone.
          </Text>
          <Heading as="h4">Web Developer & Designer — Freelance</Heading>
          <Text>
            My goal is to make technology more human. Technology should serve
            and delight its users without getting in the way. I always optimise
            for accessibility, usability, and performance to craft intuitive
            digital experiences for everyone.
          </Text>
          <Heading as="h3">Currently learning</Heading>
          <Heading as="h4">Reading</Heading>
          <Text>Life of Pi</Text>
          <Heading as="h4">Courses</Heading>
          <Text>Udacity VR Foundations Nanodegree</Text>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
