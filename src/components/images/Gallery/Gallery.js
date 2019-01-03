import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values, isEmpty } from 'lodash/fp';

import { ALIGNMENTS } from '../../../constants';
import Align from '../../layout/Align';
import RatioImage from '../RatioImage';
import Caption from '../Caption';

const containerStyles = () => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const ImagesContainer = styled('div')(containerStyles);

const singleStyles = ({ numberOfImages }) =>
  numberOfImages === 1 &&
  css`
    width: 100%;
  `;

const multipleStyles = ({ theme, numberOfImages, align }) => {
  if (numberOfImages === 1) {
    return null;
  }

  if (align === ALIGNMENTS.CENTER || align === ALIGNMENTS.FULL) {
    return css`
      width: calc((100% / ${numberOfImages}) - ${theme.spacings.mega});
    `;
  }

  return css`
    width: calc(50% - ${theme.spacings.kilo});
    margin-bottom: ${theme.spacings.giga};

    &:nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
  `;
};

const ImageWrapper = styled('div')(singleStyles, multipleStyles);

function Gallery({ caption, align, images }) {
  if (isEmpty(images)) {
    return null;
  }

  return (
    <Align align={align}>
      <ImagesContainer>
        {images.map(({ src, srcSet, alt }, i) => (
          <ImageWrapper key={i} align={align} numberOfImages={images.length}>
            <RatioImage
              src={src}
              srcSet={srcSet}
              alt={alt}
              aspectRatio={1 / 1}
            />
          </ImageWrapper>
        ))}
      </ImagesContainer>
      {caption && <Caption>{caption}</Caption>}
    </Align>
  );
}

Gallery.RIGHT = ALIGNMENTS.RIGHT;
Gallery.LEFT = ALIGNMENTS.LEFT;
Gallery.CENTER = ALIGNMENTS.CENTER;
Gallery.FULL = ALIGNMENTS.FULL;

Gallery.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(values(ALIGNMENTS)),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      srcSet: PropTypes.string,
      alt: PropTypes.string
    })
  )
};

Gallery.defaultProps = {
  align: ALIGNMENTS.LEFT,
  images: []
};

/**
 * @component
 */
export default Gallery;
