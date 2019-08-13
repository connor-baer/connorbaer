import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Main, Header, Slider, sharedStyles } from '@madebyconnor/bamboo-ui';

// eslint-disable-next-line import/no-unresolved
import { frontMatter as guides } from './guides/*.mdx';
import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import Prefooter from '../../components/Prefooter';
import Footer from '../../components/Footer';
import GuidePreview from '../../components/travel/GuidePreview';

import * as Url from '../../services/url';

const Grid = styled('div')(sharedStyles.pageWidth);

const headerStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.mega} {
    width: 90%;
  }

  ${theme.mq.giga} {
    width: 80%;
  }
`;

const StyledHeader = styled(Header)(headerStyles);

export default function TravelPage() {
  const title = 'Travel Guides';
  const subtitle =
    'Follow me around the world, explore bustling cities, and discover hidden treasures.'; // eslint-disable-line max-len
  return (
    <>
      <Meta
        title={title}
        description={subtitle}
        url={'travel'}
        image={{
          src: '/static/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera'
        }}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledHeader title={title} subtitle={subtitle} />
        </Grid>

        <Slider>
          {guides.map(guide => (
            <GuidePreview
              key={guide.title}
              url={Url.format(guide.__resourcePath)}
              {...guide}
            />
          ))}
        </Slider>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}
