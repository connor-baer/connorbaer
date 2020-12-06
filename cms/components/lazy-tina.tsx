import { TinaCMS, TinaCMSConfig } from 'tinacms';

import { slateFieldPlugin } from '../plugins/field-slate';

export { TinaProvider, useCMS } from 'tinacms';
export { useForm, usePlugin } from '@tinacms/react-core';

// Fields
export { InlineForm, InlineText } from 'react-tinacms-inline';

export { InlineSlate } from './InlineSlate';

export function initCMS(config: TinaCMSConfig): TinaCMS {
  const cms = new TinaCMS(config);

  cms.fields.add(slateFieldPlugin);

  return cms;
}
