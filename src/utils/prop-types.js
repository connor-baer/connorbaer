import PropTypes from 'prop-types';

export const imagePropType = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  alt: PropTypes.string.isRequired
};

export const captionPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.element
]);
