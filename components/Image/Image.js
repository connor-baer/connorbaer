import React from 'react';
import NextImage from 'next/image';
import { css } from '@emotion/core';
import { Image as BambooImage, propTypes } from '@madebyconnor/bamboo-ui';

const DEFAULT_WIDTH = 1200;

function formatSrc(src, { width, height, ratio }) {
  const params = { src };
  if (width) {
    params.w = Math.round(width);
  }
  if (height) {
    params.h = Math.round(height);
  }
  if (ratio) {
    params.ratio = ratio.toFixed(2);
  }
  const query = Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `/api/image/?${query}`;
}

function formatSrcSet(src, srcSet = [400, 800, 1200, 1600, 2000], ratio) {
  return srcSet
    .map((width) => {
      const height = ratio && width * (1 / ratio);
      const url = formatSrc(src, { width, height, ratio });
      return `${url} ${width}w`;
    })
    .join(', ');
}

// FIXME: Remove once next/image forwards the ref
// https://github.com/vercel/next.js/issues/18398
const nextImageStyles = css`
  animation-play-state: running !important;
`;

const Image = React.forwardRef(({ next, aspectRatio, ...props }, ref) => {
  if (!next) {
    const { width = DEFAULT_WIDTH, height } = props;
    if (process.env.NODE_ENV !== 'production') {
      console.warn('DEPRECATION: Convert image to use Next Image.');
    }

    const ratio = aspectRatio || (width && height ? width / height : null);
    const src = formatSrc(props.src, { width, height, ratio });
    const srcSet = formatSrcSet(props.src, props.srcSet, ratio);
    return (
      <BambooImage
        ref={ref}
        loading="lazy"
        {...props}
        src={src}
        srcSet={srcSet}
      />
    );
  }

  const layout = props.width || props.height ? undefined : 'fill';
  const objectFit = props.width || props.height ? undefined : 'cover';

  return (
    <NextImage
      ref={ref}
      layout={layout}
      objectFit={objectFit}
      css={nextImageStyles}
      {...props}
    />
  );
});

Image.propTypes = propTypes.imagePropType;

export default Image;
