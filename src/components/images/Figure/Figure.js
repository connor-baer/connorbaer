import React from 'react';
import PropTypes from 'prop-types';
import { values } from 'lodash/fp';

import { ALIGNMENTS } from '../../../constants';
import Align from '../../layout/Align';
import Image from '../Image';
import Caption from '../Caption';

function Figure({ caption, align, image }) {
  const { src, srcSet, alt } = image;

  if (!src) {
    return null;
  }

  return (
    <Align align={align}>
      <Image src={src} srcSet={srcSet} alt={alt} />
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
  })
};

Figure.defaultProps = {
  align: ALIGNMENTS.LEFT,
  image: {}
};

/**
 * @component
 */
export default Figure;
