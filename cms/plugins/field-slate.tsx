import { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { FieldPlugin } from 'tinacms';

const defaultValue = [{ children: [{ text: '' }] }];

export const slateFieldPlugin: FieldPlugin = {
  __type: 'field',
  name: 'slate-editor',
  Component: SlateEditor,
  defaultValue,
  // TODO: Set to null when field is empty
  // format?: (value: any, name: string, field: Field) => any
};

const Label = styled.label`
  display: block;
  font-size: var(--tina-font-size-1);
  font-weight: var(--tina-font-weight-bold);
  letter-spacing: 0.01em;
  line-height: 1.35;
  color: var(--tina-color-grey-8);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`;

const Input = styled.div`
  padding: var(--tina-padding-small);
  border-radius: var(--tina-radius-small);
  background: var(--tina-color-grey-0);
  font-size: var(--tina-font-size-2);
  line-height: 1.35;
  position: relative;
  color: var(--tina-color-grey-10);
  background-color: var(--tina-color-grey-0);
  transition: all 85ms ease-out;
  border: 1px solid var(--tina-color-grey-2);
  width: 100%;
  margin: 0;
  outline: none;
  box-shadow: 0 0 0 2px transparent;
`;

function SlateEditor({ input, field, meta }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Fragment>
      <Label htmlFor={input.name}>{field.label || field.name}</Label>
      <div>{field.description}</div>
      <Slate
        editor={editor}
        value={input.value || defaultValue}
        onChange={input.onChange}
      >
        <Input>
          <Editable />
        </Input>
      </Slate>
      <div className="field-error">{meta.error}</div>
    </Fragment>
  );
}
