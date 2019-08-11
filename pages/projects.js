import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  Columns,
  sharedStyles
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as projects } from './projects/*.mdx';
import * as Url from '../services/url';
import Navigation from '../components/Navigation';
import PreviewLarge from '../components/projects/PreviewLarge';
import { SITE_NAME, SITE_TWITTER } from '../constants';

const spacingStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};

  ${theme.mq.kilo} {
    margin-top: ${theme.spacings.exa};
    margin-bottom: ${theme.spacings.exa};
  }
`;

const StyledColumns = styled(Columns)(spacingStyles);
const StyledHeader = styled(Header)(spacingStyles);

const Grid = styled('div')(sharedStyles.pageWidth);

export default function ProjectsHome() {
  const title = 'Selected Work';
  const subtitle = 'Beautifully functional';
  const url = Url.format('projects', true);
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={url}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledColumns>
            <StyledHeader title={title} subtitle={subtitle} />
            {projects.map(project => (
              <PreviewLarge
                key={project.__resourcePath}
                url={Url.format(project.__resourcePath)}
                {...project}
              />
            ))}
          </StyledColumns>
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
