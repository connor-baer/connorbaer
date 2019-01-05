import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { values, isEmpty, omit } from 'lodash/fp';

import { imagePropType, captionPropType } from '../../../utils/prop-types';
import { ALIGNMENTS } from '../../../constants';
import Align from '../../layout/Align';
import RatioImage from '../RatioImage';
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

function Gallery({ caption, align, images, theme }) {
  if (isEmpty(images)) {
    return null;
  }

  const sizes = getSizes(theme, align);

  return (
    <Align align={align}>
      <ImagesContainer>
        {images.map((image, i) => (
          <ImageWrapper key={i} align={align} numberOfImages={images.length}>
            <RatioImage
              {...omit('toString', image)}
              sizes={sizes}
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
  caption: captionPropType,
  align: PropTypes.oneOf(values(ALIGNMENTS)),
  images: PropTypes.arrayOf(PropTypes.shape(imagePropType)),
  theme: PropTypes.object
};

Gallery.defaultProps = {
  align: ALIGNMENTS.LEFT,
  images: []
};

/**
 * @component
 */
export default Gallery;
