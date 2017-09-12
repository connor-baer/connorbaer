import PropTypes from 'prop-types';

const Svg = ({ sprite, name, width, height, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className="icon"
  >
    <use
      className={className}
      xlinkHref={`/static/svgs/${sprite}.svg#icon-${name}`}
    />
  </svg>
);

Svg.propTypes = {
  name: PropTypes.string,
  sprite: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string
};

export { Svg };
