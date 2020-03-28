import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Header,
  Small,
  RatioImage,
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

    ${theme.mq.kilo} {
      grid-column: 2 / 12;
    }

    ${theme.mq.mega} {
      grid-column: 5 / 13;
    }
  }
`;

const Grid = styled('div')(styles.grid, defaultChildStyles);

const headerStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
  width: 100%;

  ${theme.mq.mega} {
    width: 90%;
  }

  ${theme.mq.giga} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const ratioImageStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.kilo};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.zetta};
    margin-bottom: ${theme.spacings.zetta};
  }
`;

const StyledRatioImage = styled(RatioImage)(ratioImageStyles);

export default ({
  title,
  subtitle,
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
          title={title}
          description={subtitle}
          pathname={__resourcePath}
          image={image}
        />
        <Navigation />
        <Main as="article">
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
            <StyledRatioImage aspectRatio={1.618} {...image} />
            <Grid>
              <TableOfContents tableOfContents={tableOfContents} />
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
