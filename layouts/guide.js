import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Small,
  Header,
  Image,
  Intro,
  ComponentsProvider,
  styles,
  RatioImage,
} from '@madebyconnor/bamboo-ui';

import { getPreview } from '../services/preview';
import { formatDate, formatDatetime } from '../services/date';
import { travel } from '../styles/themes';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Align from '../components/travel/Align';
import TableOfContents from '../components/travel/TableOfContents';

import components from './_components';

const Container = styled('div')(styles.pageWidth);

const defaultChildStyles = ({ theme }) => css`
  > * {
    grid-column: 1 / 13;

    ${theme.mq.hand} {
      grid-column: 2 / 12;
    }

    ${theme.mq.lap} {
      grid-column: 5 / 13;
    }
  }
`;

const Grid = styled('div')(styles.grid, defaultChildStyles);

const headerStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.hand} {
    grid-column: 2 / 12;
  }

  ${theme.mq.lap} {
    grid-column: 5 / 13;
    align-self: center;
    height: 40vh;
    z-index: 1;
    position: relative;
    background-color: white;
    margin-left: calc(-1 * ${theme.spacing.gutter});
    padding-left: ${theme.spacing.gutter};
  }

  h1 {
    font-family: ${theme.fontStack.serif} !important;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const headerImageStyles = ({ theme }) => css`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-bottom: ${theme.spacing.s};
  width: 100vw;

  ${theme.mq.hand} {
    margin-bottom: ${theme.spacing.xl};
  }

  ${theme.mq.lap} {
    position: absolute;
    left: 0;
    right: auto;
    margin-left: 0;
    margin-right: 0;
    width: 50vw;
    ${'' /* right: 0;
    left: min(
      calc(-1 * ${theme.spacing.gutter}),
      calc(-1 * ((100vw - ${theme.pageWidth} + ${theme.spacing.gutter}) / 2))
    );
    margin-left: 0;
    margin-right: 0;
    margin-bottom: ${theme.spacing.xxxl};
    width: calc(
      ((${theme.pageWidth} - (${theme.spacing.gutter} / 2)) * 4 / 12) +
        ((100vw - ${theme.pageWidth} - ${theme.spacing.gutter}) / 2)
    ); */}
  }
`;

const HeaderImage = styled.div(headerImageStyles);

export default ({
  title,
  subtitle,
  description,
  image = {},
  date,
  tableOfContents,
  __resourcePath,
}) => {
  function Guide({ children }) {
    const formattedDate = formatDate(date);
    const datetime = formatDatetime(date);
    return (
      <>
        <Meta
          title={`${title} ${subtitle}`}
          description={description}
          pathname={__resourcePath}
          image={image}
        />
        <Navigation />
        <Main as="article">
          <Container>
            <Grid>
              <HeaderImage>
                <RatioImage {...image} aspectRatio={4 / 3} />
              </HeaderImage>

              <StyledHeader title={title} subtitle={subtitle}>
                {date && (
                  <div>
                    <Small>
                      <time dateTime={datetime}>{formattedDate}</time>
                    </Small>
                  </div>
                )}
              </StyledHeader>

              <TableOfContents tableOfContents={tableOfContents} />
              <Intro>{description}</Intro>
              <ComponentsProvider value={{ Align }}>
                <MDXProvider components={components}>{children}</MDXProvider>
              </ComponentsProvider>
            </Grid>
          </Container>
        </Main>
        <Prefooter />
        <Footer />
      </>
    );
  }

  Guide.theme = travel;

  return Guide;
};
