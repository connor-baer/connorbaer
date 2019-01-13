import React from 'react';
import { flow, slice } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Navigation,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

import * as Posts from '../services/posts';
import PreviewSmall from '../components/blog/PreviewSmall';
import { SITE_NAME, SITE_TWITTER, NAV_LINKS } from '../constants';
import { BASE_URL } from '../constants/paths';

export default function Page() {
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
      <Meta
        title={title}
        description={subtitle}
        url={BASE_URL}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation siteName={SITE_NAME} siteUrl={BASE_URL} links={NAV_LINKS} />
      <Main>
        <Grid>
          <Row>
            <Col span={{ default: 12, afterTera: 10 }}>
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
      <Prefooter
        text={'Let’s be friends.'}
        linkLabel={'Say hi!'}
        linkUrl={`https://twitter.com/${SITE_TWITTER}`}
      />
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER}>
        <Anchor href="/disclaimer">Disclaimer</Anchor>
      </Footer>
    </>
  );
}
