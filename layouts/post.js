import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Heading,
  Intro,
  ParallaxImage,
  sharedStyles,
  ComponentsProvider,
  useTheme
} from '@madebyconnor/bamboo-ui';

import components, { Paragraph } from './_components';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Align from '../components/Align';
import PostMeta from '../components/blog/PostMeta';

const Grid = styled('div')(sharedStyles.pageWidth, sharedStyles.grid);

const contentStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 2 / 12;
  }

  ${theme.mq.mega} {
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

  ${theme.mq.kilo} {
    height: 15rem;
  }

  ${theme.mq.mega} {
    height: 18rem;
  }

  ${theme.mq.tera} {
    height: 21rem;
  }
`;

const StyledParallaxImage = styled(ParallaxImage)(styledParallaxImageStyles);

const postHeaderStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.zetta};
  margin-bottom: ${theme.spacings.exa};
`;

const PostHeader = styled('header')(postHeaderStyles);

export default ({
  title,
  description,
  image,
  date,
  category,
  __resourcePath
}) =>
  function Post({ children }) {
    const theme = useTheme();
    useEffect(() => {
      theme.setTheme('blog');
    });

    return (
      <>
        <Meta
          title={title}
          description={description}
          pathname={__resourcePath}
          image={image}
        />
        <Navigation />
        <Main as="article">
          <StyledParallaxImage
            {...image}
            srcSet={[400, 800, 1200, 1600, 2000]}
            sizes="100vw"
          />
          <Grid>
            <Content>
              <PostHeader>
                <Heading as="h1" size="exa">
                  {title}
                </Heading>
                <PostMeta date={date} category={category} />
              </PostHeader>
              <Intro>{description}</Intro>
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
  };
