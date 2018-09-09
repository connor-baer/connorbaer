import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const wrapperStyles = ({ theme }) => css`
  display: block;
  position: relative;
  border-radius: ${theme.borderRadius.giga};
  overflow: hidden;
  height: auto;
  width: 100%;
  transition: filter 0.2s ease-in-out;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s cubic-bezier(0, 0, 0.2, 1);
    background: radial-gradient(transparent, #000);
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

const imageStyles = () => css`
  display: block;
  height: auto;
  max-height: 100%;
  width: 100%;
  transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1);
  will-change: transform;
  backface-visibility: hidden;

  a:hover &,
  a:focus & {
    transform: scale(1.04);
  }
`;

const Image = styled('img')(imageStyles);

function CoverImage({ ...props }) {
  return (
    <Wrapper>
      <Image {...props} />
    </Wrapper>
  );
}

CoverImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

CoverImage.defaultProps = {};

/**
 * @component
 */
export default CoverImage;
