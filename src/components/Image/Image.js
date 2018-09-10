import React from 'react';
import PropTypes from 'prop-types';

import { buildSourceUrl } from './ImageService';

function Image({ file, ...rest }) {
  const webp2x = buildSourceUrl(file, 'webp', true);
  const webp = buildSourceUrl(file, 'webp');
  const jpg2x = buildSourceUrl(file, 'jpg', true);
  const jpg = buildSourceUrl(file, 'jpg');
  const src = buildSourceUrl(file);
  return (
    <picture>
      <source srcSet={`${webp2x} 2x, ${webp}`} type="image/webp" />
      <source srcSet={`${jpg2x} 2x, ${jpg}`} type="image/jpeg" />
      <img {...rest} src={src} />
    </picture>
  );
}

Image.propTypes = {
  file: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

Image.defaultProps = {};

/**
 * @component
 */
export default Image;
