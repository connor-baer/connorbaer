import { Fragment, useContext } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Main, Header } from '@madebyconnor/bamboo-ui';
import { Node } from 'slate';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import { withTina, LazyTinaContext } from '../../cms/components/withTina';
import { getPreview } from '../../services/preview';
import { prisma } from '../../prisma/client';
import { serialize } from '../../utils/serialize';
import { toPlainText } from '../../services/rich-text';

const renderElement = ({ element, attributes = {}, children }) => {
  switch (element.type) {
    case 'link': {
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    }
    default: {
      return <p {...attributes}>{children}</p>;
    }
  }
};

const renderLeaf = ({ attributes, children, ...rest }) => {
  console.log({ attributes, children, ...rest });
  return <span {...attributes}>{children}</span>;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const recipe = await prisma.recipe.findFirst({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });
  return {
    props: {
      preview: getPreview(context),
      ...serialize(recipe),
    },
  };
};

type FoodProps = InferGetStaticPropsType<typeof getStaticProps>;

function Food({
  preview,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    useForm,
    usePlugin,
    InlineForm,
    InlineText,
    InlineSlate,
  } = useContext(LazyTinaContext);
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
        name: 'description',
        label: 'Description',
        component: 'slate-editor',
      },
    ],
    initialValues: props,
    onSubmit: (values) => {
      console.debug(values);
      window.alert('Saved!');
    },
  });

  usePlugin(form);

  return (
    <Fragment>
      <Meta
        title={modifiedValues.title}
        description={toPlainText(modifiedValues.description as Node[])}
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
            subtitle={
              <InlineSlate
                name="description"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
              />
            }
          />
          <ul>
            {modifiedValues.ingredients.map(({ amount, unit, ingredient }) => (
              <li key={ingredient.id}>
                {amount} {unit} {ingredient.title}
              </li>
            ))}
          </ul>
        </InlineForm>
      </Main>
    </Fragment>
  );
}

export default withTina(Food);
