import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Main, Header, Columns, sharedStyles } from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as projects } from './projects/*.mdx';
import * as Url from '../services/url';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Prefooter from '../components/Prefooter';
import Footer from '../components/Footer';
import PreviewLarge from '../components/projects/PreviewLarge';

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
  const subtitle = 'Make technology human.';
  return (
    <>
      <Meta title={title} description={subtitle} pathname={'projects'} />
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
      <Prefooter />
      <Footer />
    </>
  );
}
