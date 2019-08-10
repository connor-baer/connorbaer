import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Main,
  Header,
  Prefooter,
  Footer,
  Columns
} from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as projects } from './projects/**/index.mdx';
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

export default function ProjectsHome({ baseUrl }) {
  const title = 'Selected Work';
  const subtitle = 'Beautifully functional';
  const url = Url.format(baseUrl, 'projects');
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
          <Row>
            <Col span="12">
              <StyledColumns>
                <StyledHeader title={title} subtitle={subtitle} />
                {projects.map(project => (
                  <PreviewLarge
                    key={project.__resourcePath}
                    url={Url.format(baseUrl, project.__resourcePath)}
                    {...project}
                  />
                ))}
              </StyledColumns>
            </Col>
          </Row>
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

ProjectsHome.propTypes = {
  baseUrl: PropTypes.string
};
