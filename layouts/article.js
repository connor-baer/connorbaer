import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Header,
  ComponentsProvider,
  sharedStyles,
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Align from '../components/Align';
import components from './_components';

const Article = styled('article')(sharedStyles.pageWidth, sharedStyles.grid);

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

export default ({ title, subtitle, __resourcePath }) =>
  function ArticlePage({ children }) {
    return (
      <>
        <Meta title={title} description={subtitle} pathname={__resourcePath} />
        <Navigation />
        <Main>
          <Article>
            <Content>
              <Header title={title} subtitle={subtitle} />
              <ComponentsProvider value={{ Align }}>
                <MDXProvider components={components}>{children}</MDXProvider>
              </ComponentsProvider>
            </Content>
          </Article>
        </Main>
        <Prefooter />
        <Footer />
      </>
    );
  };
