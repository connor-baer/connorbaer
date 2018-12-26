import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

const baseStyles = ({ theme }) => css`
  width: 100%;
  height: auto;
  vertical-align: middle;
  color: ${theme.colors.n300};
  background-color: ${theme.colors.n300};
`;

const placeholderStyles = ({ colors }) =>
  colors &&
  css`
    color: ${colors[0]};
    background-color: ${colors[0]};
  `;

const Image = styled('img')(baseStyles, placeholderStyles);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  alt: PropTypes.string.isRequired
};

Image.defaultProps = {};

/**
 * @component
 */
export default Image;
