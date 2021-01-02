import { useEffect, Fragment } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { css } from '@emotion/core';
import { Header } from '@madebyconnor/bamboo-ui';
import { Recipe } from '@prisma/client';
import { TinaCMS } from 'tinacms';

import Meta from '../../components/Meta';
import { useCMS, withTina } from '../../cms';
import { createSubmit } from '../../cms/helpers';
import { prisma } from '../../prisma/client';
import { serialize } from '../../utils/serialize';
import { createSlug } from '../../utils/id';
import { getPreview } from '../../services/preview';
import { FoodLayout } from '../../sections/food/layouts';
import { foodTheme } from '../../sections/food/theme';
import { RecipePreview } from '../../sections/food/components/RecipePreview';

const pageWidth = (theme) => css`
  max-width: ${theme.maxWidth};
  margin-right: auto;
  margin-left: auto;
  padding-right: ${theme.spacing.gutter};
  padding-left: ${theme.spacing.gutter};
`;

const RecipeCreatorPlugin = (cms: TinaCMS, router: NextRouter) => ({
  __type: 'content-creator',
  name: 'Recipe',
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
  onSubmit: createSubmit(cms, async (values) => {
    const response = await fetch(`/api/cms/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const recipe = (await response.json()) as Recipe;
    const slug = createSlug(recipe.id, recipe.title);
    return router.push(`/food/${slug}`);
  }),
});

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const recipes = await prisma.recipe.findMany({
    orderBy: { id: 'asc' },
    include: {
      image: true,
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
      cms.plugins.add(RecipeCreatorPlugin(cms, router));
    }
  }, [cms, router]);

  return (
    <Fragment>
      <Meta title={title} description={description} pathname="/food" />
      <FoodLayout>
        <Header title={title} css={pageWidth} />
        <div css={pageWidth}>
          {recipes.map((recipe) => (
            <RecipePreview
              key={recipe.id}
              url={`/food/${createSlug(recipe.id, recipe.title)}`}
              title={recipe.title}
              image={recipe.image}
            />
          ))}
        </div>
      </FoodLayout>
    </Fragment>
  );
}

FoodPage.theme = foodTheme;

export default withTina(FoodPage);
