import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { buildSourceUrl } from './ImageService';

const baseStyles = ({ theme }) => css`
  width: 100%;
  height: auto;
  vertical-align: middle;
  background-color: ${theme.colors.n300};
`;

const Img = styled('img')(baseStyles);

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
      <Img {...rest} src={src} />
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
