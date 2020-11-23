import { useContext, useRef, useState, FormEvent } from 'react';

import { EditContext } from '../components/EditContext';

// TODO: Add proper hover, focus, active states.

const baseStyles = {
  transition: 'background .15s ease',
};

const activeStyles = {
  ...baseStyles,
  'background': '#f0f0f0',
  'borderRadius': '0.25em',
  '-moz-outline-radius': '0.25em',
};

interface EditOptions {
  path: string;
  initialValue: string;
  onChange?: (value: string) => void;
  multiline?: boolean;
}

export function useEdit({
  path,
  initialValue,
  onChange,
  multiline = false,
}: EditOptions) {
  const [isEditable, dispatch] = useContext(EditContext);
  const value = useRef(initialValue);
  const [isEditing, setEditing] = useState(false);

  if (!isEditable) {
    return {
      children: initialValue,
    };
  }

  const sanitize = (str: string) => (multiline ? str : stripLinebreaks(str));

  const handleFocus = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChange = (nextValue: string) => {
    const sanitizedValue = sanitize(nextValue);
    value.current = sanitizedValue;
    dispatch({ path, value: sanitizedValue });
    onChange?.(sanitizedValue);
  };

  const handleInput = (event: FormEvent) => {
    const { textContent } = event.target as HTMLElement;
    handleChange(textContent);
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const copiedValue = event.clipboardData.getData('text');
    const sanitizedValue = sanitize(copiedValue);
    // eslint-disable-next-line no-param-reassign
    (event.target as HTMLElement).innerHTML = sanitizedValue;
    handleChange(sanitizedValue);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!multiline && event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return {
    'children': value.current,
    'contentEditable': true,
    'suppressContentEditableWarning': true,
    'role': 'textbox',
    'aria-label': `Edit ${path}`,
    'aria-multiline': multiline,
    'onFocus': handleFocus,
    'onBlur': handleBlur,
    'onInput': handleInput,
    'onPaste': handlePaste,
    'onKeyDown': handleKeyDown,
    'style': isEditing ? activeStyles : baseStyles,
  };
}

function stripLinebreaks(str: string): string {
  return str.replace(/(\r\n|\n|\r)/gm, '');
}
