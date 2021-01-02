import { useContext } from 'react';
import { includes } from 'lodash/fp';

import { PreviewContext } from '../components/PreviewContext';

export default function usePreview(feature: string): boolean {
  const previewContext = useContext(PreviewContext);

  const [preview, features] = previewContext || [];

  return feature ? includes(feature, features) : preview;
}
