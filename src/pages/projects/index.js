import React from 'react';
import styled, { css } from 'react-emotion';
import { Grid, Row, Col } from '@sumup/circuit-ui';
import {
  Anchor,
  Meta,
  Navigation,
  Main,
  Header,
  Prefooter,
  Footer,
  Columns
} from '@madebyconnor/bamboo-ui';

import * as Projects from '../../services/projects';
import PreviewLarge from '../../components/projects/PreviewLarge';
import { SITE_NAME, SITE_TWITTER, NAV_LINKS } from '../../constants';
import { BASE_URL, PROJECTS_PATH } from '../../constants/paths';

const spacingStyles = ({ theme }) => css`
  margin-top: ${theme.spacings.giga};
  margin-bottom: ${theme.spacings.giga};

  ${theme.mq.kilo`
    margin-top: ${theme.spacings.exa};
    margin-bottom: ${theme.spacings.exa};
  `};
`;

const StyledColumns = styled(Columns)(spacingStyles);
const StyledHeader = styled(Header)(spacingStyles);

function ProjectsHome() {
  const posts = Projects.load();
  const sortedProjects = Projects.sortByDate(posts);
  const title = 'Selected Work';
  const subtitle = 'Beautifully functional';
  const url = `${BASE_URL}/${PROJECTS_PATH}`;
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={url}
        siteName={SITE_NAME}
        siteTwitter={SITE_TWITTER}
      />
      <Navigation siteName={SITE_NAME} siteUrl={BASE_URL} links={NAV_LINKS} />
      <Main>
        <Grid>
          <Row>
            <Col span="12">
              <StyledColumns>
                <StyledHeader title={title} subtitle={subtitle} />
                {sortedProjects.map(post => (
                  <PreviewLarge key={post.slug} {...post} />
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

export default ProjectsHome;
