import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Main, Header, styles } from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';

const TITLE_MAP = {
  404: 'Page not found. 🕵',
  500: 'An error occured. 💩',
  503: 'Bear with me please. 🚧',
};

const SUBTITLE_MAP = {
  404: 'What’s worse, a hilarious 404 page can’t be found either.',
  500: 'Something has gone wrong. Try to refresh the page or go back to the homepage.',
  503: 'I’m currently carrying out some maintenance on my website. It will only take a minute.',
};

const Grid = styled('div')(styles.pageWidth, styles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 1 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

export default function ErrorPage({ statusCode = 500 }) {
  const title = TITLE_MAP[statusCode];
  const subtitle = SUBTITLE_MAP[statusCode];
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
      <Main>
        <Grid>
          <Content>
            <Header title={title} subtitle={subtitle} />
          </Content>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}

ErrorPage.getInitialProps = (ctx) => {
  const { res, err } = ctx;
  const statusCode = (res && res.statusCode) || (err && err.statusCode);
  return { statusCode };
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
};
