import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import Navigation from '../components/Navigation';

import { SITE_NAME, SITE_TWITTER } from '../constants';

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

const Grid = styled('div')(sharedStyles.pageWidth, sharedStyles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

function ErrorPage({ statusCode = 500 }) {
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
      <Navigation />
      <Main>
        <Grid>
          <Content>
            <Header title={title} subtitle={subtitle} />
          </Content>
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

ErrorPage.getInitialProps = ctx => {
  const { res, err } = ctx;
  const statusCode = (res && res.statusCode) || (err && err.statusCode);
  return { statusCode };
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  statusCode: PropTypes.number
};

export default ErrorPage;
