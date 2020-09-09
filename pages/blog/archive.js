import React from 'react';

import { getPreview } from '../../services/preview';
import Blog from '../blog';

export function getStaticProps(context) {
  return { props: { preview: getPreview(context) } };
}

export default function Archive() {
  return <Blog title="Archive" isArchived />;
}
