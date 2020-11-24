import { ComponentType } from 'react';
import { TinaProvider, TinaCMS, TinaCMSConfig } from 'tinacms';

import usePreview from '../../hooks/use-preview';

export function withTina(
  Component: ComponentType<any>,
  config: TinaCMSConfig = {},
) {
  return (props: any) => {
    const enabled = usePreview('edit');

    const cms = new TinaCMS({
      toolbar: enabled,
      enabled,
      ...config,
    });

    return (
      <TinaProvider cms={cms} styled={enabled}>
        <Component {...props} />
      </TinaProvider>
    );
  };
}
