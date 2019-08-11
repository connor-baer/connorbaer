import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

import components from './_components';
import Navigation from '../components/Navigation';
import IntroSection from '../components/projects/IntroSection';

import * as Url from '../services/url';
import { SITE_NAME, SITE_TWITTER } from '../constants';

const Article = styled('article')(sharedStyles.pageWidth, sharedStyles.grid);

const headerStyles = theme => css`
  grid-column: 1 / 13;

  ${theme.mq.kilo} {
    grid-column: 1 / 12;
  }

  ${theme.mq.mega} {
    grid-column: 1 / 11;
  }
`;

const introBriefStyles = theme => css`
  grid-column: 1 / 13;

  ${theme.mq.tera} {
    grid-column: 1 / 7;
  }
`;

const introSkillStyles = theme => css`
  grid-column: 1 / 13;

  ${theme.mq.mega} {
    grid-column: 1 / 7;
  }

  ${theme.mq.tera} {
    grid-column: 7 / 10;
  }
`;

const introClientStyles = theme => css`
  grid-column: 1 / 13;

  ${theme.mq.mega} {
    grid-column: 7 / 13;
  }

  ${theme.mq.tera} {
    grid-column: 10 / 13;
  }
`;

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

export default ({
  title,
  subtitle,
  brief,
  image,
  skills,
  client,
  __resourcePath
}) =>
  function Project({ children }) {
    const url = Url.format(__resourcePath, true);

    return (
      <>
        <Meta
          title={title}
          description={brief}
          url={url}
          image={image}
          siteName={SITE_NAME}
          siteTwitter={SITE_TWITTER}
        />
        <Navigation />
        <Main>
          <Article>
            <Header title={title} subtitle={subtitle} css={headerStyles} />

            <IntroSection title="Overview" css={introBriefStyles}>
              {brief}
            </IntroSection>
            <IntroSection title="Involvement" css={introSkillStyles}>
              {skills.map(skill => (
                <p key={skill}>{skill}</p>
              ))}
            </IntroSection>
            <IntroSection title="Client" css={introClientStyles}>
              {client}
            </IntroSection>

            <Content>
              <MDXProvider components={components}>{children}</MDXProvider>
            </Content>
          </Article>
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
