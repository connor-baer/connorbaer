/* eslint-disable react/display-name */
import { useCMS } from '@tinacms/react-core';
import { InlineField } from 'react-tinacms-inline';

import { RichTextOptions, toReact } from '../../services/rich-text';

import { Editor } from './Slate';

interface InlineSlateProps extends RichTextOptions {
  name: string;
}

export function InlineSlate({
  name,
  renderElement,
  renderLeaf,
}: InlineSlateProps) {
  const cms = useCMS();

  return (
    <InlineField name={name}>
      {({ input }) => {
        if (cms.enabled) {
          return (
            <Editor
              value={input.value}
              onChange={input.onChange}
              // renderElement={renderElement}
              // renderLeaf={renderLeaf}
            />
          );
        }
        return input.value
          ? toReact(input.value, { renderElement, renderLeaf })
          : null;
      }}
    </InlineField>
  );
}
