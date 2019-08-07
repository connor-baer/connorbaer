/* eslint-disable max-len, global-require */
import React from 'react';
import { Grid, Row, Col, Text, Heading } from '@sumup/circuit-ui';
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
  Hr
} from '@madebyconnor/bamboo-ui';

export default function About() {
  const title = 'I am Connor.';
  const subtitle =
    'I am web developer with a strong background in design, born in Germany and currently living in Berlin. Nice to meet you 👋';
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <Grid>
          <Row>
            <Col span={{ default: 12, afterTera: 10 }}>
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
        </Grid>
        <Collage
          images={[
            {
              ...require(`./connor.jpg?resize&sizes[]=400&sizes[]=800&sizes[]=1200&sizes[]=2400`),
              colors: require(`./connor.jpg?lqip-colors`),
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            },
            {
              ...require(`./hackathon.jpg?resize&sizes[]=400&sizes[]=800&sizes[]=1200&sizes[]=2400`),
              colors: require(`./hackathon.jpg?lqip-colors`),
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            },
            {
              ...require(`./beach.jpg?resize&sizes[]=400&sizes[]=800&sizes[]=1200&sizes[]=2400`),
              colors: require(`./beach.jpg?lqip-colors`),
              aspectRatio: 21 / 9,
              alt: 'Connor flashes a big smile at the camera.'
            }
          ]}
        />
        <Grid>
          <Row>
            <Col span="12">
              <Columns>
                <Intro>
                  My roots lie in the field of design, however I ultimately
                  found my passion in programming. The approach I take to my
                  work is fun, fearless, and always forward-looking. My goal is
                  to make technology more human.
                </Intro>

                <Intro>
                  Technology should serve and delight its users without getting
                  in the way. I always optimise for accessibility, usability,
                  and performance to craft intuitive digital experiences for
                  everyone.
                </Intro>
              </Columns>
            </Col>
          </Row>
          <Hr />
          <Row>
            <Col span={{ default: 12, afterTera: 4 }}>
              <Heading element="h3">Experience</Heading>
            </Col>
            <Col span={{ default: 12, afterTera: 8 }}>
              <Heading element="h4" size={Heading.GIGA}>
                Frontend Engineer — SumUp Services
              </Heading>
              <Text size={Text.GIGA}>
                My goal is to make technology more human. Technology should
                serve and delight its users without getting in the way. I always
                optimise for accessibility, usability, and performance to craft
                intuitive digital experiences for everyone.
              </Text>
              <Heading element="h4" size={Heading.GIGA}>
                Web Developer & Designer — Freelance
              </Heading>
              <Text size={Text.GIGA}>
                My goal is to make technology more human. Technology should
                serve and delight its users without getting in the way. I always
                optimise for accessibility, usability, and performance to craft
                intuitive digital experiences for everyone.
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={{ default: 12, afterTera: 4 }}>
              <Heading element="h3">Currently learning</Heading>
            </Col>
            <Col span={{ default: 12, afterTera: 8 }}>
              <Heading element="h4" size={Heading.GIGA}>
                Reading
              </Heading>
              <Text size={Text.GIGA}>Life of Pi</Text>
              <Heading element="h4" size={Heading.GIGA}>
                Courses
              </Heading>
              <Text size={Text.GIGA}>Udacity VR Foundations Nanodegree</Text>
            </Col>
          </Row>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
