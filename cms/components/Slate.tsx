import { useMemo } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import {
  // ParagraphPlugin,
  // BoldPlugin,
  // EditablePlugins,
  // ItalicPlugin,
  // UnderlinePlugin,
  pipe,
} from '@udecode/slate-plugins';
// import { Text } from '@madebyconnor/bamboo-ui';

// const plugins = [
//   ParagraphPlugin(),
//   BoldPlugin({
//     bold: {
//       component: Text,
//       rootProps: {
//         as: 'strong',
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-expect-error
//         bold: true,
//       },
//     },
//   }),
//   ItalicPlugin(),
//   UnderlinePlugin(),
// ];

const defaultValue = [{ children: [{ text: '' }] }] as Node[];
// const defaultPlaceholder = 'Enter some text...';

interface EditorProps {
  value?: Node[];
  placeholder?: string;
  onChange: (value: Node[]) => void;
  // renderElement;
  // renderLeaf;
}

export function Editor({ value, placeholder, onChange }: EditorProps) {
  const editor = useMemo(
    () => pipe(createEditor(), withReact, withHistory),
    [],
  );

  return (
    <Slate editor={editor} value={value || defaultValue} onChange={onChange}>
      {/* <EditablePlugins
        plugins={plugins}
        placeholder={placeholder || defaultPlaceholder}
      /> */}
      {/* <Editable renderElement={renderElement} renderLeaf={renderLeaf} /> */}
      <Editable />
    </Slate>
  );
}
