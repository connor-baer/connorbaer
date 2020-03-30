import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Header,
  Small,
  RatioImage,
  Intro,
  ComponentsProvider,
  styles,
} from '@madebyconnor/bamboo-ui';

import { travel } from '../styles/themes';
import { formatDate, formatDatetime } from '../utils/date';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Align from '../components/travel/Align';
import components from './_components';
import TableOfContents from '../components/travel/TableOfContents';

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
  font-family: ${theme.fontStack.serif};
  width: 100%;

  ${theme.mq.lap} {
    width: 90%;
  }

  ${theme.mq.desk} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const ratioImageStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.s};

  ${theme.mq.hand} {
    margin-top: ${theme.spacing.xxxxl};
    margin-bottom: ${theme.spacing.xxxxl};
  }
`;

const StyledRatioImage = styled(RatioImage)(ratioImageStyles);

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
          <RatioImage aspectRatio={1.618} {...image} />
          <Container>
            <StyledHeader title={title} subtitle={subtitle}>
              {date && (
                <div>
                  <Small element="time" dateTime={datetime}>
                    {formattedDate}
                  </Small>
                </div>
              )}
            </StyledHeader>

            <Grid>
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
