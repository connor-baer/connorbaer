import React from 'react';
import { Image as BambooImage, propTypes } from '@madebyconnor/bamboo-ui';

const DEFAULT_WIDTH = 1200;

function formatSrc(src, { width, height, ratio }) {
  const params = {};
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
  return `${src}?${query}`;
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

export default function Image(props = {}) {
  const { width = DEFAULT_WIDTH, height, aspectRatio } = props;
  const ratio = aspectRatio || (width && height ? width / height : null);
  const src = formatSrc(props.src, { width, height, ratio });
  const srcSet = formatSrcSet(props.src, props.srcSet, ratio);
  return <BambooImage {...props} src={src} srcSet={srcSet} />;
}

Image.propTypes = propTypes.imagePropType;
