import React from 'react';
import PropTypes from 'prop-types';
import { flow, slice } from 'lodash/fp';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/**/index.mdx';
import sortByDate from '../utils/sort-by-date';
import Navigation from '../components/Navigation';
import PreviewSmall from '../components/blog/PreviewSmall';

import { SITE_NAME, SITE_TWITTER } from '../constants';
import * as Url from '../services/url';

const title = 'Hello, I’m Connor.';
const subtitle =
  'I am a web developer with a strong background in design and a passion for accessibility, currently working as a frontend engineer at SumUp.'; // eslint-disable-line max-len

export default function Page({ baseUrl }) {
  const sortedPosts = flow(
    sortByDate,
    slice(0, 3)
  )(posts);
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={baseUrl}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation />
      <Main>
        <Grid>
          <Row>
            <Col span={{ default: 12, afterTera: 10 }}>
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
          <Row>
            {sortedPosts.map((post, i) => (
              <Col key={i} span={{ default: 12, kilo: 6, mega: 4 }}>
                <PreviewSmall
                  url={Url.format(baseUrl, post.__resourcePath)}
                  {...post}
                />
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

Page.propTypes = {
  baseUrl: PropTypes.string
};
