import React from 'react';
import { InlineImageProps } from 'react-tinacms-inline';

import { useLazyTina } from '..';

export function InlineImageGroup({
  name,
  children,
  ...rest
}: Omit<InlineImageProps, 'parse'>) {
  const { InlineGroup, InlineImage } = useLazyTina();
  // FIXME: Replace full URL with id and figure out how to better use the Cloudinary loader.
  return (
    <InlineGroup
      name={name}
      fields={[
        {
          name: 'alt',
          label: 'Alternative label',
          description:
            'A textual description of the image is read by screen readers.',
          component: 'textarea',
        },
        {
          name: 'color',
          label: 'Color',
          description:
            'The dominant color of the image is displayed as a fallback while the image is loading.',
          component: 'color',
        },
      ]}
    >
      <InlineImage
        name="src"
        parse={(media) =>
          `https://res.cloudinary.com/madebyconnor/image/upload/v1/${media.id}`
        }
        {...rest}
      >
        {(props) => (props.src ? children(props) : null)}
      </InlineImage>
    </InlineGroup>
  );
}
