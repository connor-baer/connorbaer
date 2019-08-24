import PropTypes from 'prop-types';

export const blogPostPropType = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    color: PropTypes.string,
    alt: PropTypes.string
  }),
  className: PropTypes.string
};

export const projectPropType = {
  url: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  brief: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string),
  client: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    color: PropTypes.string,
    alt: PropTypes.string
  })
};

export const mapPropType = {
  lat: PropTypes.number,
  lon: PropTypes.number
};

export const guidePropType = {
  __resourcePath: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tableOfContents: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string
    })
  ),
  date: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    srcSet: PropTypes.string,
    color: PropTypes.string,
    alt: PropTypes.string
  }),
  map: PropTypes.shape(mapPropType)
};
