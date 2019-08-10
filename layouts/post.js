import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Prefooter,
  Footer,
  Intro,
  ParallaxImage,
  useTheme
} from '@madebyconnor/bamboo-ui';

import components, { Paragraph } from './_components';
import Navigation from '../components/Navigation';
import PostMeta from '../components/blog/PostMeta';

import * as Url from '../services/url';
import { SITE_NAME, SITE_TWITTER } from '../constants';

const styledParagraphStyles = ({ theme }) => css`
  font-family: ${theme.fontStack.serif};
`;

const StyledParagraph = styled(Paragraph)(styledParagraphStyles);

const styledParallaxImageStyles = ({ theme }) => css`
  height: 180px;

  ${theme.mq.kilo} {
    height: 240px;
  }

  ${theme.mq.mega} {
    height: 300px;
  }

  ${theme.mq.tera} {
    height: 360px;
  }
`;

const StyledParallaxImage = styled(ParallaxImage)(styledParallaxImageStyles);

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
`;

const Heading = styled('h1')(headingStyles);

export default ({
  title,
  description,
  image,
  date,
  category,
  __resourcePath
}) =>
  function Post({ children, baseUrl }) {
    const theme = useTheme();
    useEffect(() => {
      theme.setTheme('blog');
    });

    const url = Url.format(baseUrl, __resourcePath);

    return (
      <>
        <Meta
          title={title}
          description={description}
          url={url}
          image={image}
          siteName={SITE_NAME}
          siteTwitter={SITE_TWITTER}
        />
        <Navigation />
        <Main>
          <article>
            <StyledParallaxImage {...image} />
            <Grid>
              <Row>
                <Col
                  span={{ default: 12, mega: 10, afterTera: 8 }}
                  skip={{ default: 0, mega: 1, afterTera: 2 }}
                >
                  <PostHeader>
                    <Heading>{title}</Heading>
                    <PostMeta date={date} category={category} />
                  </PostHeader>
                  <Intro>{description}</Intro>
                  <MDXProvider
                    components={{ ...components, p: StyledParagraph }}
                  >
                    {children}
                  </MDXProvider>
                </Col>
              </Row>
            </Grid>
          </article>
        </Main>
        <Prefooter
          text={'Let’s be friends.'}
          linkLabel={'Say hi!'}
          linkUrl={`https://twitter.com/${SITE_TWITTER}`}
        />
        <Footer siteName={SITE_NAME} siteTwitter={SITE_TWITTER}>
          <Anchor href="/disclaimer">Disclaimer</Anchor>
        </Footer>
      </>
    );
  };
