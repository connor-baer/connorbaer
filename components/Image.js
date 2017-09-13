import PropTypes from 'prop-types';
import classNames from 'classnames';
import { animations } from '../styles';

const Image = ({
  src,
  sizes,
  alt,
  caption,
  width = '100%',
  height = 'auto',
  className,
  responsive = null,
  cover = false
}) => {
  const index = src.lastIndexOf('.');
  const [filename, format] = [src.slice(0, index), src.slice(index + 1)];
  const srcSet =
    responsive && `${filename}.${format} 1000w, ${filename}@2x.${format} 2000w`;
  return (
    <figure className={classNames(classNames, { cover })}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        style={{ width, height }}
        alt={alt}
      />
      {caption && <figcaption>{caption}</figcaption>}
      <style jsx>{`
        img {
          display: block;
          vertical-align: middle;
        }

        .cover {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;

          & img {
            object-fit: cover;
          }
        }
      `}</style>
    </figure>
  );
};

Image.propTypes = {
  src: PropTypes.string,
  sizes: PropTypes.string,
  alt: PropTypes.string,
  caption: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  responsive: PropTypes.bool
};

export { Image };
