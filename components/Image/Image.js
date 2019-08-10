import React from 'react';
import { Image as BambooImage, sharedPropTypes } from '@madebyconnor/bamboo-ui';

function formatSrcSet(src, srcSet = [400, 800, 1200, 1600, 2000]) {
  return srcSet.map(set => `${src}?w=${set} ${set}w`).join(', ');
}

export default function Image(props) {
  const srcSet = formatSrcSet(props.src, props.srcSet);
  return <BambooImage {...props} srcSet={srcSet} />;
}

Image.propTypes = sharedPropTypes.imagePropType;
