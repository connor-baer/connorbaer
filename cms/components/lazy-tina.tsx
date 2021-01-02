import { TinaCMS, TinaCMSConfig } from 'tinacms';

import { slateFieldPlugin } from '../plugins/field-slate';
import { CloudinaryMediaStore } from '../plugins/next-tinacms-cloudinary';

export { TinaProvider, useCMS } from 'tinacms';
export { useForm, usePlugin } from '@tinacms/react-core';

// Fields
export {
  InlineForm,
  InlineText,
  InlineTextarea,
  InlineImage,
  InlineGroup,
} from 'react-tinacms-inline';

export { InlineSlate } from './InlineSlate';

export function initCMS(config: TinaCMSConfig): TinaCMS {
  const cms = new TinaCMS(config);

  cms.fields.add(slateFieldPlugin);

  cms.media.store = new CloudinaryMediaStore(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  );

  return cms;
}
