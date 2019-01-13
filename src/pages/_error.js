import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Meta,
  Navigation,
  Main,
  Header,
  Prefooter,
  Footer
} from '@madebyconnor/bamboo-ui';

import { SITE_NAME, SITE_TWITTER, NAV_LINKS } from '../constants';
import { BASE_URL } from '../constants/paths';

const TITLE_MAP = {
  404: 'Page not found. 🕵',
  500: 'An error occured. 💩',
  503: 'Bear with me please. 🚧'
};

/* eslint-disable max-len */
const SUBTITLE_MAP = {
  404: 'What’s worse, a hilarious 404 page can’t be found either.',
  500: 'Something has gone wrong. Try to refresh the page or go back to the homepage.',
  503: 'I’m currently carrying out some maintenance on my website. It will only take a minute.'
};
/* eslint-enable max-len */

function Error({ statusCode }) {
  const title = TITLE_MAP[statusCode];
  const subtitle = SUBTITLE_MAP[statusCode];
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation siteName={SITE_NAME} siteUrl={BASE_URL} links={NAV_LINKS} />
      <Main>
        <Grid>
          <Row>
            <Col
              span={{ default: 12, kilo: 10, mega: 8 }}
              skip={{ default: 0, kilo: 1, mega: 2 }}
            >
              <Header title={title} subtitle={subtitle} />
            </Col>
          </Row>
        </Grid>
      </Main>
      <Prefooter
        text={'Let’s be friends.'}
        linkLabel={'Say hi!'}
        linkUrl={`https://twitter.com/${SITE_TWITTER}`}
      />
      <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER} />
    </>
  );
}

Error.getInitialProps = ctx => {
  const { res, err } = ctx;
  const statusCode = (res && res.statusCode) || (err && err.statusCode);
  return { statusCode };
};

Error.propTypes = {
  title: PropTypes.string,
  statusCode: PropTypes.number
};

Error.defaultProps = {
  statusCode: 500
};

export default Error;
