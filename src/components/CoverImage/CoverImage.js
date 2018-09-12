import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Image from '../Image/Image';

const wrapperStyles = ({ theme }) => css`
  display: block;
  position: relative;
  border-radius: ${theme.borderRadius.giga};
  overflow: hidden;
  height: auto;
  width: 100%;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity ${theme.animations.standard};
    background: radial-gradient(transparent, ${theme.colors.shadow});
    content: '';
    opacity: 0;
  }

  a:hover &,
  a:focus & {
    &::after {
      opacity: 0.1;
    }
  }
`;

const Wrapper = styled('div')(wrapperStyles);

const imageBaseStyles = ({ theme }) => css`
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
  border-radius: ${theme.borderRadius.giga};
`;

const imageMotionStyles = ({ theme }) =>
  !theme.reducedMotion &&
  css`
    transition: transform ${theme.animations.motion};
    will-change: transform;
    backface-visibility: hidden;

    a:hover &,
    a:focus & {
      transform: scale(1.04);
    }
  `;

const StyledImage = styled(Image)(imageBaseStyles, imageMotionStyles);

function CoverImage({ ...props }) {
  return (
    <Wrapper>
      <StyledImage {...props} />
    </Wrapper>
  );
}

CoverImage.propTypes = {
  file: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

/**
 * @component
 */
export default CoverImage;
