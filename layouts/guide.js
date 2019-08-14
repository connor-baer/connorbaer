import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import {
  Main,
  Intro,
  Small,
  RatioImage,
  Heading,
  ComponentsProvider,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import { formatDate, formatDatetime } from '../utils/date';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import Align from '../components/travel/Align';
import Aside from '../components/travel/Aside';
import components from './_components';

const Container = styled('div')(sharedStyles.pageWidth);

const defaultChildStyles = ({ theme }) => css`
  * {
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
  font-family: Georgia, ${theme.fontStack.serif};
`;

const StyledHeading = styled(Heading)(headingStyles);

const ratioImageStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.tera};
  margin-bottom: ${theme.spacings.tera};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.zetta};
    margin-bottom: ${theme.spacings.zetta};
  }
`;

const StyledRatioImage = styled(RatioImage)(ratioImageStyles);

export default ({ title, subtitle, image, date, contents, __resourcePath }) =>
  function Guide({ children }) {
    console.log({ contents });
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
            <PostHeader>
              <StyledHeading size="exa">{title}</StyledHeading>
              {date && (
                <Small element="time" dateTime={datetime}>
                  {formattedDate}
                </Small>
              )}
              <StyledRatioImage aspectRatio={1.618} {...image} />
            </PostHeader>
            <Grid>
              <Aside>Connor</Aside>
              <Intro>{subtitle}</Intro>
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
  };
