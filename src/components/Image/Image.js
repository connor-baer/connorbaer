import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { buildSourceUrl } from './ImageService';

const EXTENSION_REGEXP = /\.([^/.]+)$/

const baseStyles = ({ theme }) => css`
  width: 100%;
  height: auto;
  vertical-align: middle;
  color: ${theme.colors.n300};
  background-color: ${theme.colors.n300};
`;

const Img = styled('img')(baseStyles);

function Image({ src, ...rest }) {
  const [extension, format = 'jpg'] = EXTENSION_REGEXP.exec(src) || [];
  const file = extension ? src.replace(EXTENSION_REGEXP, '') : src;
  const webp = buildSourceUrl(file, 'webp');
  const webp2x = buildSourceUrl(file, 'webp', true);
  const original = buildSourceUrl(file, format);
  const original2x = buildSourceUrl(file, format, true);
  const srcWithExtension = buildSourceUrl(file);
  return (
    <picture>
      <source srcSet={`${webp2x} 2x, ${webp}`} type="image/webp" />
      <source srcSet={`${original2x} 2x, ${original}`} type="image/jpeg" />
      <Img {...rest} src={srcWithExtension} />
    </picture>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

Image.defaultProps = {};

/**
 * @component
 */
export default Image;
