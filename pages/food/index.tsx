import { Fragment } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useForm, usePlugin } from '@tinacms/react-core';
import { InlineForm, InlineText } from 'react-tinacms-inline';
import { Main, Header } from '@madebyconnor/bamboo-ui';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import { withTina } from '../../components/tinacms';
import { getPreview } from '../../services/preview';

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => ({
  props: {
    preview: getPreview(context),
    title: 'Hello world',
    subtitle: 'This is me.',
  },
});

// type FoodProps = InferGetStaticPropsType<typeof getStaticProps>;
type FoodProps = {
  title: string;
  subtitle: string;
};

function Food(props: FoodProps) {
  const [modifiedValues, form] = useForm<FoodProps>({
    id: 'food-index',
    label: 'Edit Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        component: 'text',
      },
    ],
    initialValues: props,
    onSubmit: () => {
      window.alert('Saved!');
    },
  });

  usePlugin(form);

  return (
    <Fragment>
      <Meta
        title={modifiedValues.title}
        description={modifiedValues.subtitle}
        pathname={''}
        image={{
          src: '/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera',
        }}
      />
      <Navigation />
      <Main>
        <InlineForm form={form}>
          <Header
            title={<InlineText name="title" />}
            subtitle={<InlineText name="subtitle" />}
          />
        </InlineForm>
      </Main>
    </Fragment>
  );
}

export default withTina(Food);
