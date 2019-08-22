import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { MAPBOX } from '../../constants/tokens';

const placeholderStyles = ({ theme, width, height }) => css`
  width: ${width};
  height: ${height};
  background: ${theme.colors.n300};
`;

const Placeholder = styled('div')(placeholderStyles);

const ReactMapGL = dynamic(() => import('react-map-gl'), {
  ssr: false
});

// Easter Island
const DEFAULT_VIEWPORT = {
  width: '100%',
  height: '50vh',
  latitude: -27.1227,
  longitude: -109.3497,
  zoom: 11
};

export default function Map({
  theme = 'streets-v9',
  viewport: customViewPort,
  ...rest
}) {
  const initialViewport = { ...DEFAULT_VIEWPORT, ...customViewPort };
  const [viewport, setViewport] = useState(initialViewport);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Placeholder width={viewport.width} height={viewport.height}>
        <ReactMapGL
          mapStyle={`mapbox://styles/mapbox/${theme}`}
          mapboxApiAccessToken={MAPBOX}
          onViewportChange={v => setViewport(v)}
          {...viewport}
          {...rest}
        />
      </Placeholder>
    </>
  );
}

Map.propTypes = {
  theme: PropTypes.string,
  viewport: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  })
};
