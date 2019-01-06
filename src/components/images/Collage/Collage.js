import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { isEmpty, omit } from 'lodash/fp';

import { imagePropType } from '../../../utils/prop-types';
import RatioImage from '../RatioImage';

const containerStyles = ({ theme }) => css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${theme.spacings.zetta};

  ${theme.mq.kilo`
    flex-wrap: nowrap;
  `};
`;

const ImagesContainer = styled('div')(containerStyles);

const baseWrapperStyles = ({ theme }) => css`
  ${theme.mq.kilo`
    margin-right: ${theme.spacings.mega};

    &:last-child {
      margin-right: 0;
    }
  `};
`;

const outerWrapperStyles = ({ theme }) => css`
  display: none;

  ${theme.mq.kilo`
    display: block;
    width: 27.3%;
  `};
`;

const innerWrapperStyles = ({ theme }) => css`
  width: 100%;

  ${theme.mq.kilo`
    width: 45.4%;
  `};
`;

const OuterWrapper = styled('div')(baseWrapperStyles, outerWrapperStyles);
const InnerWrapper = styled('div')(baseWrapperStyles, innerWrapperStyles);

function Collage({ images, theme }) {
  if (isEmpty(images)) {
    return null;
  }

  // const sizes = getSizes(theme);

  return (
    <ImagesContainer>
      <OuterWrapper>
        <RatioImage
          {...omit('toString', images[0])}
          sizes={''}
          aspectRatio={1 / 1}
        />
      </OuterWrapper>
      <InnerWrapper>
        <RatioImage
          {...omit('toString', images[1])}
          sizes={''}
          aspectRatio={1.66 / 1}
        />
      </InnerWrapper>
      <OuterWrapper>
        <RatioImage
          {...omit('toString', images[2])}
          sizes={''}
          aspectRatio={1 / 1}
        />
      </OuterWrapper>
    </ImagesContainer>
  );
}

Collage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(imagePropType)),
  theme: PropTypes.object
};

Collage.defaultProps = {
  images: []
};

/**
 * @component
 */
export default Collage;
