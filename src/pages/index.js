import React from 'react';
import { flow, slice } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Posts from '../services/posts';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Main from '../components/Main';
import Header from '../components/Header';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import PreviewSmall from '../components/blog/PreviewSmall';

function Page() {
  const title = 'Hello, I’m Connor.';
  // eslint-disable-next-line max-len
  const subtitle =
    'I am a web developer with a strong background in design and a passion for accessibility, currently working as a frontend engineer at SumUp.'; // eslint-disable-line max-len
  const posts = flow(
    Posts.sortByDate,
    slice(0, 3)
  )(Posts.load());
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <Grid>
          <Row>
            <Col span={{ default: 12, tera: 10 }}>
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
          <Row>
            {posts.map((post, i) => (
              <Col key={i} span={{ default: 12, kilo: 6, mega: 4 }}>
                <PreviewSmall {...post} />
              </Col>
            ))}
          </Row>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}

export default Page;
