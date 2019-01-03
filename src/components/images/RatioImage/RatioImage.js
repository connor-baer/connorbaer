import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Image from '../Image';

const wrapperBaseStyles = () => css`
  display: block;
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
`;

const wrapperAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    height: 0;
    width: 100%;
    padding-top: ${(1 / aspectRatio) * 100}%;
  `;

const Wrapper = styled('div')(wrapperBaseStyles, wrapperAspectRatioStyles);

const imageBaseStyles = () => css`
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
`;

const imageAspectRatioStyles = ({ aspectRatio }) =>
  aspectRatio &&
  css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

const StyledImage = styled(Image)(imageBaseStyles, imageAspectRatioStyles);

function RatioImage({ aspectRatio, className, ...props }) {
  return (
    <Wrapper aspectRatio={aspectRatio} className={className}>
      <StyledImage aspectRatio={aspectRatio} {...props} />
    </Wrapper>
  );
}

RatioImage.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number,
  className: PropTypes.string
};

/**
 * @component
 */
export default RatioImage;
