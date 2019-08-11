import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import {
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  Anchor,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import components from './_components';
import Navigation from '../components/Navigation';

import { SITE_NAME, SITE_TWITTER } from '../constants';
import * as Url from '../services/url';

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
    const url = Url.format(__resourcePath, true);
    return (
      <>
        <Meta
          title={title}
          description={subtitle}
          url={url}
          siteName={SITE_NAME}
          siteTwitter={SITE_TWITTER}
        />
        <Navigation />
        <Main>
          <Article>
            <Content>
              <Header title={title} subtitle={subtitle} />
              <MDXProvider components={components}>{children}</MDXProvider>
            </Content>
          </Article>
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
  };
