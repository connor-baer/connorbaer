import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Heading,
  Intro,
  ParallaxImage,
  ComponentsProvider,
  styles,
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import { Footer } from '../components/Footer';
import Align from '../components/Align';
import PostMeta from '../components/blog/PostMeta';

import components, { Paragraph } from './_components';

const Grid = styled('div')(styles.pageWidth, styles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 2 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 3 / 11;
  }
`;

const Content = styled('div')(contentStyles);

const styledParagraphStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
`;

const StyledParagraph = styled(Paragraph)(styledParagraphStyles);

const styledParallaxImageStyles = ({ theme }) => css`
  height: 12rem;

  ${theme.mq.hand} {
    height: 15rem;
  }

  ${theme.mq.lap} {
    height: 18rem;
  }

  ${theme.mq.wall} {
    height: 21rem;
  }
`;

const StyledParallaxImage = styled(ParallaxImage)(styledParallaxImageStyles);

const postHeaderStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xl};

  ${theme.mq.lap} {
    margin-top: ${theme.spacing.xxxxl};
    margin-bottom: ${theme.spacing.xxxl};
  }
`;

const PostHeader = styled('header')(postHeaderStyles);

// export function getStaticProps(context) {
//   return { props: { preview: getPreview(context) } };
// }

export default function Post({ children, frontMatter }) {
  const {
    title,
    description,
    image,
    date,
    category,
    __resourcePath: pathname,
  } = frontMatter;
  return (
    <>
      <Meta
        title={title}
        description={description}
        pathname={pathname}
        image={image}
      />
      <Navigation />
      <Main as="article">
        <StyledParallaxImage
          {...image}
          srcSet={[400, 800, 1200, 1600, 2000]}
          sizes="100vw"
          loading="eager"
        />
        <Grid>
          <Content>
            <PostHeader>
              <Heading as="h1" size="xxl">
                {title}
              </Heading>
              <PostMeta date={date} category={category} />
            </PostHeader>
            <Intro css={styles.spacing({ bottom: 'xl' })}>{description}</Intro>
            <ComponentsProvider value={{ Align }}>
              <MDXProvider components={{ ...components, p: StyledParagraph }}>
                {children}
              </MDXProvider>
            </ComponentsProvider>
          </Content>
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
