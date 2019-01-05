import React from 'react';
import styled, { css } from 'react-emotion';
import { Grid, Row, Col } from '@sumup/circuit-ui';

import * as Projects from '../../services/projects';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import Main from '../../components/Main';
import Header from '../../components/Header';
import Prefooter from '../../components/Prefooter';
import Footer from '../../components/Footer';
import PreviewLarge from '../../components/projects/PreviewLarge';
import Columns from '../../components/layout/Columns/Columns';

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
  return (
    <>
      <Meta title={title} description={subtitle} />
      <Navigation />
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
      <Prefooter />
      <Footer />
    </>
  );
}

export default ProjectsHome;
