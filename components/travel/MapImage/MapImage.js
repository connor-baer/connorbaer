/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { useTheme } from 'emotion-theming';
import { RatioImage, ComponentsProvider, Image } from '@madebyconnor/bamboo-ui';

import { constructStaticImageUrl } from '../../../services/mapbox';
import { mapPropType } from '../../../utils/prop-types';
import Link from '../../Link';

export default function MapImage({ map, width = 500, height = 300, ...rest }) {
  const theme = useTheme();

  if (isEmpty(map)) {
    return null;
  }
  const aspectRatio = width / height;
  const params = {
    themeId: theme.darkmode ? 'dark-v10' : 'light-v10',
    width,
    height,
    ...map,
  };

  const src = constructStaticImageUrl(params);
  const src2x = constructStaticImageUrl({ ...params, highResolution: true });
  const renderImage = () => (
    <ComponentsProvider value={{ Image }}>
      <RatioImage
        aspectRatio={aspectRatio}
        {...rest}
        src={src}
        srcSet={`${src}, ${src2x} 2x`}
      />
    </ComponentsProvider>
  );

  if (!map.name) {
    return renderImage();
  }

  const url = `https://www.google.com/maps/search/?api=1&query=${map.name}`;
  return (
    <Link href={url}>
      <a title={`${map.name} on Google Maps`} target="_blank">
        {renderImage()}
      </a>
    </Link>
  );
}

MapImage.propTypes = {
  map: PropTypes.shape(mapPropType),
  width: PropTypes.number,
  height: PropTypes.number,
};
