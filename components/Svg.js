import PropTypes from 'prop-types';

const Svg = ({ sprite, name, width, height, fill, className }) => (
  <span style={{ width, height }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox={`0 0 ${width} ${height}`}
      className="icon"
    >
      <use
        className={className}
        xlinkHref={`/static/svgs/${sprite}.svg#icon-${name}`}
      />
    </svg>
    <style jsx>{`
      svg {
        vertical-align: middle;
        margin-top: -3px;
      }
    `}</style>
  </span>
);

Svg.propTypes = {
  name: PropTypes.string,
  sprite: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  className: PropTypes.string
};

export { Svg };
