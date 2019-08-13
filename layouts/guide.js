import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Intro,
  Figure,
  sharedStyles,
  useTheme
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import components, { Paragraph } from './_components';

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

const styledParagraphStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
`;

const StyledParagraph = styled(Paragraph)(styledParagraphStyles);

const postHeaderStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.zetta};
  margin-bottom: ${theme.spacings.exa};
`;

const PostHeader = styled('header')(postHeaderStyles);

const headingStyles = ({ theme }) => css`
  font-size: ${theme.fontSizes.exa};
  font-weight: ${theme.fontWeight.bold};
  line-height: ${theme.lineHeights.byte};
  font-family: Georgia, serif;
`;

const Heading = styled('h1')(headingStyles);

export default ({ title, description, image, __resourcePath }) =>
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
          <Grid>
            <Content>
              <PostHeader>
                <Heading>{title}</Heading>
                <Figure
                  image={{
                    ...image,
                    aspectRatio: 1.618
                  }}
                  align={Figure.FULL}
                />
              </PostHeader>
              <Intro>{description}</Intro>
              <MDXProvider components={{ ...components, p: StyledParagraph }}>
                {children}
              </MDXProvider>
            </Content>
          </Grid>
        </Main>
        <Prefooter />
        <Footer />
      </>
    );
  };
