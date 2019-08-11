import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { flow, slice } from 'lodash/fp';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as posts } from './blog/*.mdx';
import sortByDate from '../utils/sort-by-date';
import Navigation from '../components/Navigation';
import PreviewSmall from '../components/blog/PreviewSmall';

import { SITE_NAME, SITE_TWITTER } from '../constants';
import * as Url from '../services/url';

const TITLE = 'Hello, I’m Connor.';
const SUBTITLE =
  'I am a web developer with a strong background in design and a passion for accessibility, currently working as a frontend engineer at SumUp.'; // eslint-disable-line max-len

const postStyles = ({ theme, index }) => {
  const kiloColumns = ['1 / 7', '7 / 13', '1 / 7'];
  const megaColumns = ['1 / 5', '5 / 9', '9 / 13'];
  return css`
    align-self: start;
    grid-column: 1 / 13;

    ${theme.mq.kilo} {
      grid-column: ${kiloColumns[index]};
    }

    ${theme.mq.mega} {
      grid-column: ${megaColumns[index]};
    }
  `;
};

const Grid = styled('div')(sharedStyles.pageWidth, sharedStyles.grid);

const headerStyles = ({ theme }) => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 11;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

const Post = styled('div')(postStyles);

export default function Page() {
  const sortedPosts = flow(
    sortByDate(),
    slice(0, 3)
  )(posts);
  return (
    <>
      <Meta
        title={TITLE}
        description={SUBTITLE}
        url={Url.format('', true)}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledHeader title={TITLE} subtitle={SUBTITLE} />
          {sortedPosts.map((post, i) => (
            <Post key={i} index={i}>
              <PreviewSmall url={Url.format(post.__resourcePath)} {...post} />
            </Post>
          ))}
        </Grid>
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
}
