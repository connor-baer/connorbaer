import React from 'react';
import { Image as BambooImage, sharedPropTypes } from '@madebyconnor/bamboo-ui';

const DEFAULT_WIDTH = 1200;

function formatSrc(src, { width, height, ratio }) {
  const params = {};
  if (width) {
    params.w = width;
  }
  if (height) {
    params.h = height;
  }
  if (ratio) {
    params.ratio = ratio;
  }
  const query = Object.keys(params)
    .filter(key => !!params[key])
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return `${src}?${query}`;
}

function formatSrcSet(src, srcSet = [400, 800, 1200, 1600, 2000], ratio) {
  return srcSet
    .map(width => {
      const height = width * (1 / ratio);
      const url = formatSrc(src, { width, height, ratio });
      return `${url} ${width}w`;
    })
    .join(', ');
}

export default function Image(props = {}) {
  const { width = DEFAULT_WIDTH, height, aspectRatio } = props;
  const ratio =
    aspectRatio || (width && height ? (width / height).toFixed(2) : null);
  const src = formatSrc(props.src, { width, height, ratio });
  const srcSet = formatSrcSet(props.src, props.srcSet, ratio);
  return <BambooImage {...props} src={src} srcSet={srcSet} />;
}

Image.propTypes = sharedPropTypes.imagePropType;
