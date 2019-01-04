import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';

import { ALIGNMENTS } from '../../../constants';
import Align from '../../layout/Align';
import Image from '../Image';
import Caption from '../Caption';

function getSizes(theme, align) {
  const gigaMap = {
    [ALIGNMENTS.RIGHT]: '360px',
    [ALIGNMENTS.LEFT]: '360px',
    [ALIGNMENTS.CENTER]: '755px',
    [ALIGNMENTS.FULL]: '1155px'
  };
  const gigaSize = `(min-width: ${theme.breakpoints.giga}px) ${gigaMap[align]}`;

  const megaMap = {
    [ALIGNMENTS.RIGHT]: '380px',
    [ALIGNMENTS.LEFT]: '380px',
    [ALIGNMENTS.CENTER]: '790px',
    [ALIGNMENTS.FULL]: '950px'
  };
  const megaSize = `(min-width: ${theme.breakpoints.mega}px) ${megaMap[align]}`;

  const mobileSize = '100vw';

  return [gigaSize, megaSize, mobileSize].join(', ');
}

function Figure({ caption, align, image, theme }) {
  const { src, srcSet, alt } = image;

  if (!src) {
    return null;
  }

  const sizes = getSizes(theme, align);

  return (
    <Align align={align}>
      <Image src={src} srcSet={srcSet} sizes={sizes} alt={alt} />
      {caption && <Caption>{caption}</Caption>}
    </Align>
  );
}

Figure.RIGHT = ALIGNMENTS.RIGHT;
Figure.LEFT = ALIGNMENTS.LEFT;
Figure.CENTER = ALIGNMENTS.CENTER;
Figure.FULL = ALIGNMENTS.FULL;

Figure.propTypes = {
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(values(ALIGNMENTS)),
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    alt: PropTypes.string
  }),
  theme: PropTypes.object
};

Figure.defaultProps = {
  align: ALIGNMENTS.LEFT,
  image: {}
};

/**
 * @component
 */
export default Figure;
