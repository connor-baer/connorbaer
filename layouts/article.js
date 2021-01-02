import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Header,
  ComponentsProvider,
  styles,
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import Align from '../components/Align';

import components from './_components';

const Article = styled('article')(styles.pageWidth, styles.grid);

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

// export function getStaticProps(context) {
//   return { props: { preview: getPreview(context) } };
// }

export default function ArticlePage({ children, frontMatter }) {
  const { title, subtitle, __resourcePath: pathname } = frontMatter;
  return (
    <>
      <Meta title={title} description={subtitle} pathname={pathname} />
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
}
