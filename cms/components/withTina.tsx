import {
  createContext,
  useContext,
  useState,
  useEffect,
  ComponentType,
  ReactNode,
} from 'react';
import { Node } from 'slate';
import type * as Tina from 'tinacms';

import usePreview from '../../hooks/use-preview';
import { RichTextOptions, toReact } from '../../services/rich-text';

import type * as LazyLoad from './lazy-load';

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

type Components = Omit<typeof LazyLoad, 'initCMS'> & {
  cms: Tina.TinaCMS;
};

const initialComponents: { [key in keyof Components]: any } = {
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
};

export const TinaComponentsContext = createContext<Components>(
  initialComponents,
);

export function withTina<T>(
  Component: ComponentType<T>,
  config: Tina.TinaCMSConfig = {},
) {
  return (props: T): JSX.Element => {
    const enabled = usePreview('edit');
    const [components, setComponents] = useState<Components>(initialComponents);

    useEffect(() => {
      if (enabled) {
        import('./lazy-load')
          .then(({ initCMS, ...rest }) => {
            const cms = initCMS({
              sidebar: enabled,
              toolbar: enabled,
              enabled,
              ...config,
            });

            setComponents({ cms, ...rest });
          })
          .catch(() => {});
      }
    }, [enabled]);

    const { cms, TinaProvider } = components;

    return (
      <TinaComponentsContext.Provider value={components}>
        <TinaProvider cms={cms} styled={enabled}>
          <Component {...props} />
        </TinaProvider>
      </TinaComponentsContext.Provider>
    );
  };
}
