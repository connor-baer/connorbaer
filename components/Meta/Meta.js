import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash/fp';
import { Meta, propTypes } from '@madebyconnor/bamboo-ui';

import { NAME, TWITTER } from '../../constants/site';
import * as Url from '../../services/url';

const DEFAULT_IMAGE = {
  src: '/static/images/pages/connor.jpg',
  alt: 'Connor smiles at the camera.',
};

export default function CustomMeta({
  pathname,
  image = DEFAULT_IMAGE,
  ...rest
}) {
  const url = !isNil(pathname) && Url.format(pathname, true);
  const src = image.src && Url.format(image.src, true);
  return (
    <Meta
      url={url}
      siteName={NAME}
      siteTwitter={TWITTER}
      image={{ src, alt: image.alt }}
      {...rest}
    />
  );
}

CustomMeta.propTypes = {
  pathname: PropTypes.string,
  image: PropTypes.shape(propTypes.imagePropType),
};
