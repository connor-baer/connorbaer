import React from 'react';
import PropTypes from 'prop-types';
import { Meta, sharedPropTypes } from '@madebyconnor/bamboo-ui';

import { SITE_NAME, SITE_TWITTER } from '../../constants';
import * as Url from '../../services/url';

export default function CustomMeta({ pathname, image = {}, ...rest }) {
  const url = pathname && Url.format(pathname, true);
  const src = image.src && Url.format(image.src, true);
  return (
    <Meta
      url={url}
      siteName={SITE_NAME}
      siteTwitter={SITE_TWITTER}
      image={{ src, alt: image.alt }}
      {...rest}
    />
  );
}

CustomMeta.propTypes = {
  pathname: PropTypes.string,
  image: sharedPropTypes.imagePropType
};