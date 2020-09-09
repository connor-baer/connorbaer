import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Main, Header, styles } from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';

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

export default function NotFoundPage() {
  const title = 'Page not found. 🕵';
  const subtitle = 'What’s worse, a hilarious 404 page can’t be found either.';
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
