import { useEffect, Fragment } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { Node } from 'slate';
import { Anchor, Main, Header } from '@madebyconnor/bamboo-ui';
import { Recipe } from '@prisma/client';

import Meta from '../../components/Meta';
import Navigation from '../../components/Navigation';
import { useCMS, withTina } from '../../cms';
import { prisma } from '../../prisma/client';
import { serialize } from '../../utils/serialize';
import { createSlug } from '../../utils/id';
import { getPreview } from '../../services/preview';
import { toPlainText } from '../../services/rich-text';
import * as logger from '../../services/logger';

const BlogPostCreatorPlugin = (router) => ({
  __type: 'content-creator',
  name: 'BlogPostCreator',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(title) {
        if (!title) {
          return 'Required.';
        }
        return false;
      },
    },
  ],
  async onSubmit(values) {
    try {
      const response = await fetch(`/api/cms/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const recipe: Recipe = await response.json();
      const slug = createSlug(recipe.id, recipe.title);
      router.push(`/food/${slug}`);
    } catch (error) {
      logger.error(error);
    }
  },
});

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const recipes = await prisma.recipe.findMany({
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
      recipes: recipes.map(serialize),
    },
  };
};

type FoodPageProps = InferGetStaticPropsType<typeof getStaticProps>;

function FoodPage({ recipes }: FoodPageProps) {
  const title = 'Recipes';
  const description = 'Delicious. Healthy. Sustainable.';

  const cms = useCMS();
  const router = useRouter();

  useEffect(() => {
    if (cms && cms.plugins) {
      cms.plugins.add(BlogPostCreatorPlugin(router));
    }
  }, [cms, router]);

  return (
    <Fragment>
      <Meta title={title} description={description} pathname="/food" />
      <Navigation />
      <Main>
        <Header title={title} subtitle={description} />
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Anchor href={`/food/${createSlug(recipe.id, recipe.title)}`}>
                {recipe.title}{' '}
                {recipe.description &&
                  toPlainText(recipe.description as Node[])}
              </Anchor>
            </li>
          ))}
        </ul>
      </Main>
    </Fragment>
  );
}

export default withTina(FoodPage);
