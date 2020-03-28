import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Main, Header, styles } from '@madebyconnor/bamboo-ui';

import { travel } from '../../styles/themes';
import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import Prefooter from '../../components/Prefooter';
import Footer from '../../components/Footer';
import GuideLarge from '../../components/travel/GuideLarge';

import useCities from '../../hooks/use-cities';

const Grid = styled('div')(styles.pageWidth);

const headerStyles = ({ theme }) => css`
  font-family: Playfair Display;
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
  const [cities] = useCities();

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
          alt: 'Connor Bär smiles at the camera',
        }}
      />
      <Navigation />
      <Main>
        <Grid>
          <StyledHeader title={title} subtitle={subtitle} />

          {cities.map((city) => (
            <GuideLarge key={city.title} url={city.url} {...city} />
          ))}
        </Grid>
      </Main>
      <Prefooter />
      <Footer />
    </>
  );
}

TravelPage.theme = travel;
