import {
  createContext,
  useContext,
  useState,
  useEffect,
  ComponentType,
  ReactNode,
} from 'react';
import { Button } from '@madebyconnor/bamboo-ui';
import type { Node } from 'slate';
import type * as Tina from 'tinacms';
import { css } from '@emotion/core';

import usePreview from '../../hooks/use-preview';
import { RichTextOptions, toReact } from '../../services/rich-text';

import type * as LazyTinaImport from './lazy-tina';

type Form = Record<string, unknown>;

const FormContext = createContext<Form>({});

function InlineForm({ form, children }: { form: Form; children: ReactNode }) {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}

interface FieldProps {
  name: keyof Form;
}

function InlineText({ name }: FieldProps) {
  const fields = useContext(FormContext);
  return fields[name] || null;
}

interface SlateFieldProps extends FieldProps, RichTextOptions {}

function InlineSlate({ name, ...options }: SlateFieldProps) {
  const fields = useContext(FormContext);
  return fields[name] ? toReact(fields[name] as Node[], options) : null;
}

const noop = () => {};
const NoopComponent = ({ children }: { children: ReactNode }) =>
  children || null;

export type LazyTina = Omit<typeof LazyTinaImport, 'initCMS'> & {
  cms: Tina.TinaCMS;
};

const initialTina: { [key in keyof LazyTina]: any } = {
  cms: {},
  TinaProvider: NoopComponent,
  InlineForm,
  InlineText,
  InlineSlate,
  useForm: <T extends unknown>({
    initialValues,
  }: {
    initialValues: T;
  }): [T, T] => [initialValues, initialValues],
  usePlugin: noop,
  useCMS: () => ({}),
};

export const LazyTinaContext = createContext<LazyTina>(initialTina);

function EditButton() {
  const { useCMS } = useContext(LazyTinaContext);
  const cms = useCMS();

  if (cms.enabled) {
    return null;
  }

  return (
    <Button
      onClick={cms.enable}
      css={css`
        position: fixed;
        z-index: 99999;
        top: 1.25rem;
        right: 1.5rem;
      `}
    >
      Edit
    </Button>
  );
}

export function withTina<T>(
  Component: ComponentType<T>,
  config: Tina.TinaCMSConfig = {},
) {
  return (props: T): JSX.Element => {
    const enabled = usePreview('edit');
    const [components, setComponents] = useState<LazyTina>(initialTina);

    useEffect(() => {
      if (enabled) {
        import('./lazy-tina')
          .then(({ initCMS, ...rest }) => {
            const cms = initCMS({
              toolbar: true,
              enabled: false,
              ...config,
            });

            setComponents({ cms, ...rest });
          })
          .catch(() => {});
      }
    }, [enabled]);

    const { TinaProvider } = components;

    return (
      <LazyTinaContext.Provider value={components}>
        <TinaProvider cms={components.cms} styled={enabled}>
          <Component {...props} />
          {enabled && <EditButton />}
        </TinaProvider>
      </LazyTinaContext.Provider>
    );
  };
}
