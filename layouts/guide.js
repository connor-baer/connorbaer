import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Header,
  Small,
  CoverImage,
  Intro,
  ComponentsProvider,
  styles,
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

const heroImageStyles = ({ theme }) => css`
  margin-bottom: ${theme.spacing.s};

  ${theme.mq.hand} {
    margin-bottom: ${theme.spacing.xxxxl};
  }
`;

const HeroImage = styled(CoverImage)(heroImageStyles);

// export function getStaticProps(context) {
//   return { props: { preview: getPreview(context) } };
// }

export default function Guide({ children, frontMatter }) {
  const {
    title,
    subtitle,
    description,
    image = {},
    date,
    tableOfContents,
    __resourcePath,
  } = frontMatter;
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
      <Main as="article" style={{ minHeight: '200vh' }}>
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
          {image && (
            <HeroImage aspectRatio={1.618} {...image} loading="eager" />
          )}

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
