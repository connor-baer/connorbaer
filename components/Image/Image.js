import React from 'react';
import { Image as BambooImage, sharedPropTypes } from '@madebyconnor/bamboo-ui';

const DEFAULT_WIDTH = 1200;

function formatSrc(src, width) {
  return `${src}?w=${width}`;
}

function formatSrcSet(src, srcSet = [400, 800, 1200, 1600, 2000]) {
  return srcSet.map(width => `${formatSrc(src, width)} ${width}w`).join(', ');
}

export default function Image(props) {
  const width = props.width || DEFAULT_WIDTH;
  const src = formatSrc(props.src, width);
  const srcSet = formatSrcSet(props.src, props.srcSet);
  return <BambooImage {...props} src={src} srcSet={srcSet} />;
}

Image.propTypes = sharedPropTypes.imagePropType;
