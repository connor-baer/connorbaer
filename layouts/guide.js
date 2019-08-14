import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Intro,
  RatioImage,
  Heading,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import components from './_components';

const Container = styled('div')(sharedStyles.pageWidth);

const defaultChildStyles = ({ theme }) => css`
  > * {
    grid-column: 1 / 13;

    ${theme.mq.kilo} {
      grid-column: 2 / 12;
    }

    ${theme.mq.mega} {
      grid-column: 5 / 13;
    }
  }
`;

const Grid = styled('div')(sharedStyles.grid, defaultChildStyles);

const postHeaderStyles = ({ theme }) => css`
  display: block;
  margin-top: ${theme.spacings.zetta};
  margin-bottom: ${theme.spacings.exa};
`;

const PostHeader = styled('header')(postHeaderStyles);

const headingStyles = ({ theme }) => css`
  font-family: Georgia, serif;
`;

const StyledHeading = styled(Heading)(headingStyles);

export default ({ title, subtitle, image, __resourcePath }) =>
  function Guide({ children }) {
    return (
      <>
        <Meta
          title={title}
          description={subtitle}
          pathname={__resourcePath}
          image={image}
        />
        <Navigation />
        <Main as="article">
          <Container>
            <PostHeader>
              <StyledHeading size="exa">{title}</StyledHeading>
              <RatioImage aspectRatio={1.618} {...image} />
            </PostHeader>
            <Grid>
              <Intro>{subtitle}</Intro>
              <MDXProvider components={components}>{children}</MDXProvider>
            </Grid>
          </Container>
        </Main>
        <Prefooter />
        <Footer />
      </>
    );
  };
