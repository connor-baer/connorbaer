import { Fragment } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Main, Header } from '@madebyconnor/bamboo-ui';
import { Node } from 'slate';
import { Recipe } from '@prisma/client';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import { withTina, useLazyTina } from '../../cms';
import { prisma } from '../../prisma/client';
import { serialize } from '../../utils/serialize';
import { createSlug, parseSlug } from '../../utils/id';
import { getPreview } from '../../services/preview';
import { toPlainText } from '../../services/rich-text';
import * as logger from '../../services/logger';

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

export async function getStaticPaths() {
  const recipes = await prisma.recipe.findMany();
  return {
    paths: recipes.map((recipe) => ({
      params: { slug: createSlug(recipe.id, recipe.title) },
    })),
    fallback: 'blocking',
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.slug as string;
  const recipeId = parseSlug(slug);

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: { include: { ingredient: true } },
      instructions: true,
    },
  });
  return {
    props: {
      slug,
      preview: getPreview(context),
      ...serialize(recipe),
    },
  };
};

type RecipePageProps = InferGetStaticPropsType<typeof getStaticProps>;

function RecipePage({
  slug,
  preview,
  ingredients,
  instructions,
  ...recipe
}: RecipePageProps) {
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
        cms.alerts.info('Saving recipe...');

        await fetch(`/api/cms/recipes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        cms.alerts.success('Saved recipe.');
      } catch (error) {
        cms.alerts.error('Error saving recipe!', 5000);
        logger.error(error);
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
        pathname={`/food/${slug}`}
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

export default withTina(RecipePage);
