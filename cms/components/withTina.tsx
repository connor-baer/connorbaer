import {
  createContext,
  useContext,
  useState,
  useEffect,
  ComponentType,
  ReactNode,
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { get } from 'lodash/fp';
import { css } from '@emotion/core';
import { Button } from '@madebyconnor/bamboo-ui';
import type { Node } from 'slate';
import type * as Tina from 'tinacms';

import usePreview from '../../hooks/usePreview';
import { RichTextOptions, toReact } from '../../services/rich-text';
import { sessionStore } from '../../services/storage';
import { ImageProps } from '../../types/media';

import type * as LazyTinaImport from './lazy-tina';

type Form = Record<string, unknown>;

const FormContext = createContext<Form>({});

function InlineForm({ form, children }: { form: Form; children: ReactNode }) {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}

const FieldContext = createContext<{ name?: string }>({});

interface GroupProps {
  name: keyof Form;
  children: ReactNode;
}

function InlineGroup({ name, children }: GroupProps) {
  let fieldName = name;

  const parent = useContext(FieldContext);

  if (parent.name) {
    fieldName = `${parent.name}.${name}`;
  }

  return (
    <FieldContext.Provider value={{ name: fieldName }}>
      {children}
    </FieldContext.Provider>
  );
}

interface FieldProps {
  name: keyof Form;
}

function InlineField({ name }: FieldProps) {
  let fieldName = name;

  const form = useContext(FormContext);
  const parent = useContext(FieldContext);

  if (parent.name) {
    fieldName = `${parent.name}.${name}`;
  }

  return get(fieldName, form) || null;
}

interface InlineImageProps {
  name: keyof Form;
  children: (image: Partial<ImageProps>) => ReactNode;
}

function InlineImage({ name, children }: InlineImageProps) {
  let fieldName = name;

  const form = useContext(FormContext);
  const parent = useContext(FieldContext);

  if (parent.name) {
    fieldName = `${parent.name}.${name}`;
  }

  const src = get(fieldName, form) as string;

  return src ? children({ src }) : null;
}

interface SlateFieldProps extends FieldProps, RichTextOptions {}

function InlineSlate({ name, ...options }: SlateFieldProps) {
  const fields = useContext(FormContext);
  return fields[name] ? toReact(fields[name] as Node[], options) : null;
}

const noop = () => {};
const NoopComponent = ({ children }: { children: ReactNode }) =>
  children || null;

const useForm = <T extends unknown>({
  initialValues,
}: {
  initialValues: T;
}): [T, T] => [initialValues, initialValues];

export type LazyTina = Omit<typeof LazyTinaImport, 'initCMS'> & {
  cms: Tina.TinaCMS;
};

const initialTina: { [key in keyof LazyTina]: any } = {
  cms: {},
  TinaProvider: NoopComponent,
  InlineForm,
  InlineGroup,
  InlineText: InlineField,
  InlineTextarea: InlineField,
  InlineImage,
  InlineSlate,
  useForm,
  usePlugin: noop,
  useCMS: () => ({}),
};

export const LazyTinaContext = createContext<LazyTina>(initialTina);

const editButtonStyles = (theme) => css`
  position: fixed;
  z-index: 99999;
  top: 0.75rem;
  right: ${theme.spacing.gutter};

  ${theme.mq.lap} {
    top: 1.25rem;
    right: 50%;
    transform: translateX(50%);
  }
`;

function EditButton() {
  const { useCMS } = useContext(LazyTinaContext);
  const cms = useCMS();

  if (cms.enabled) {
    return null;
  }

  return (
    <Button onClick={cms.enable} css={editButtonStyles}>
      Edit
    </Button>
  );
}

export function withTina<T>(
  Component: ComponentType<T>,
  config: Tina.TinaCMSConfig = {},
) {
  function WithTina(props: T): JSX.Element {
    const enabled = usePreview('edit');
    const [components, setComponents] = useState<LazyTina>(initialTina);

    useEffect(() => {
      if (enabled) {
        import('./lazy-tina')
          .then(({ initCMS, ...rest }) => {
            const cms = initCMS({
              toolbar: true,
              enabled: sessionStore.getItem('cms') === 'enabled',
              ...config,
            });

            cms.events.subscribe('cms:enable', () => {
              sessionStore.setItem('cms', 'enabled');
            });
            cms.events.subscribe('cms:disable', () => {
              sessionStore.setItem('cms', 'disabled');
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
  }

  hoistNonReactStatics(WithTina, Component);

  return WithTina;
}
