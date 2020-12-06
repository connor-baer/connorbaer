import { Fragment } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Main, Header } from '@madebyconnor/bamboo-ui';
import { Node } from 'slate';
import { Recipe } from '@prisma/client';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import { withTina, useLazyTina } from '../../cms';
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
      instructions: true,
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
  ingredients,
  instructions,
  ...recipe
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    useCMS,
    useForm,
    usePlugin,
    InlineForm,
    InlineText,
    InlineSlate,
  } = useLazyTina();
  const cms = useCMS();
  const [modifiedRecipe, recipeForm] = useForm<Recipe>({
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
    initialValues: recipe,
    onSubmit: async ({ id, ...values }: Recipe) => {
      try {
        cms.alerts.info('Saving content...');

        await fetch(`/api/cms/recipes/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        cms.alerts.success('Saved content.');
      } catch (error) {
        cms.alerts.error('Error saving content!');
        console.error(error);
      }
    },
  });

  usePlugin(recipeForm);

  const { title, description } = modifiedRecipe;

  return (
    <Fragment>
      <Meta
        title={title}
        description={description && toPlainText(description as Node[])}
        pathname={''}
        image={{
          src: '/images/pages/connor.jpg',
          alt: 'Connor Bär smiles at the camera',
        }}
      />
      <Navigation />
      <Main>
        <InlineForm form={recipeForm}>
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
        </InlineForm>
        <ul>
          {ingredients.map(({ amount, unit, ingredient }) => (
            <li key={ingredient.id}>
              {amount} {unit} {ingredient.title}
            </li>
          ))}
        </ul>
      </Main>
    </Fragment>
  );
}

export default withTina(Food);
