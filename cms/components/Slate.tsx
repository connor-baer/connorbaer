import { useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import {
  ParagraphPlugin,
  BoldPlugin,
  EditablePlugins,
  ItalicPlugin,
  UnderlinePlugin,
  pipe,
} from '@udecode/slate-plugins';
import { Text } from '@madebyconnor/bamboo-ui';

const plugins = [
  ParagraphPlugin(),
  BoldPlugin({
    bold: {
      component: Text,
      rootProps: {
        as: 'strong',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        bold: true,
      },
    },
  }),
  ItalicPlugin(),
  UnderlinePlugin(),
];

const defaultValue = [{ children: [{ text: '' }] }];
const defaultPlaceholder = 'Enter some text...';

export function Editor({
  value = defaultValue,
  placeholder = defaultPlaceholder,
  onChange,
  // renderElement,
  // renderLeaf,
}) {
  const editor = useMemo(
    () => pipe(createEditor(), withReact, withHistory),
    [],
  );

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <EditablePlugins plugins={plugins} placeholder={placeholder} />
      {/* <Editable renderElement={renderElement} renderLeaf={renderLeaf} /> */}
    </Slate>
  );
}
