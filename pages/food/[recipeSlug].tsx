import { Fragment } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import {
  Header,
  Heading,
  RatioImage,
  Paragraph,
  styles,
  HEIGHT_NAVIGATION,
} from '@madebyconnor/bamboo-ui';
import { Recipe } from '@prisma/client';

import Meta from '../../components/Meta';
import { withTina, useLazyTina } from '../../cms';
import { createSubmit } from '../../cms/helpers';
import { InlineImageGroup } from '../../cms/components/InlineImageGroup';
import { prisma } from '../../prisma/client';
import { serialize } from '../../utils/serialize';
import { createSlug, parseSlug } from '../../utils/id';
import { getPreview } from '../../services/preview';
import { foodTheme } from '../../sections/food/theme';
import { RecipeLayout } from '../../sections/food/layouts/recipe';
import { Ingredients } from '../../sections/food/components/Ingredients';
import { Instructions } from '../../sections/food/components/Instructions';

const sidebarStyles = ({ theme }) => css`
  ${theme.mq.hand} {
    flex-shrink: 0;
    width: 18rem;
    max-width: 30vw;
    margin-right: calc(2 * ${theme.spacing.gutter});
  }
`;

const headerStyles = ({ theme }) => css`
  ${theme.mq.hand} {
    display: flex;
    align-items: center;
  }
`;

const StyledHeader = styled(Header.Wrapper)(headerStyles);

const titleStyles = ({ theme }) => css`
  &,
  input {
    font-family: ${theme.fontStack.display};
  }

  ${theme.mq.hand} {
    margin: 0;
  }
`;

const Title = styled(Heading)(titleStyles, sidebarStyles);

const asideStyles = ({ theme }) => css`
  ${theme.mq.hand} {
    position: sticky;
    top: ${theme.spacing.xs};
    align-self: flex-start;
    overflow-y: scroll;
    max-height: 100vh;
  }

  ${theme.mq.lap} {
    top: ${HEIGHT_NAVIGATION};
  }
`;

const Aside = styled('aside')(sidebarStyles, asideStyles);

const contentStyles = ({ theme }) => css`
  margin-top: ${theme.spacing.xxxl};

  ${theme.mq.hand} {
    display: flex;
  }
`;

const Content = styled('div')(styles.pageWidth, contentStyles);

// const renderElement = ({ element, attributes = {}, children }) => {
//   switch (element.type) {
//     case 'link': {
//       return (
//         <a {...attributes} href={element.url}>
//           {children}
//         </a>
//       );
//     }
//     default: {
//       return <p {...attributes}>{children}</p>;
//     }
//   }
// };

// const renderLeaf = ({ attributes, children, ...rest }) => {
//   console.log({ attributes, children, ...rest });
//   return <span {...attributes}>{children}</span>;
// };

export async function getStaticPaths() {
  const recipes = await prisma.recipe.findMany();
  return {
    paths: recipes.map((recipe) => ({
      params: { recipeSlug: createSlug(recipe.id, recipe.title) },
    })),
    fallback: 'blocking',
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.recipeSlug as string;
  const recipeId = parseSlug(slug);

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: { include: { ingredient: true } },
      instructions: true,
      utensils: true,
      image: true,
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
  utensils,
  prepTime,
  cookTime,
  ...recipe
}: RecipePageProps) {
  const {
    useCMS,
    useForm,
    usePlugin,
    InlineForm,
    InlineTextarea,
  } = useLazyTina();
  const cms = useCMS();
  const [modifiedRecipe, recipeForm] = useForm<typeof recipe>({
    id: 'recipe',
    label: 'Edit Page',
    initialValues: recipe,
    fields: [
      {
        name: 'serves',
        label: 'Serves',
        component: 'number',
      },
    ],
    onSubmit: createSubmit<Recipe>(cms, ({ id, ...values }) =>
      fetch(`/api/cms/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }),
    ),
  });

  usePlugin(recipeForm);

  const { title, description, image, serves } = modifiedRecipe;

  return (
    <Fragment>
      <Meta
        title={title}
        description={description}
        pathname={`/food/${slug}`}
        image={image}
      />
      <RecipeLayout variant={null}>
        <article>
          <InlineForm form={recipeForm}>
            <div css={styles.pageWidth}>
              <StyledHeader>
                <Title as="h1" size="xxl">
                  <InlineTextarea name="title" />
                </Title>

                <div
                  css={css`
                    width: 100%;
                  `}
                >
                  <InlineImageGroup
                    name="image"
                    uploadDir={() => '/connorbaerco/food'}
                    alt={image && image.alt}
                  >
                    {(props) => (
                      <RatioImage
                        {...image}
                        src={props.src}
                        loading="eager"
                        aspectRatio={1.618}
                        next
                      />
                    )}
                  </InlineImageGroup>
                </div>
              </StyledHeader>
            </div>

            <Content>
              <Aside>
                <Ingredients ingredients={ingredients} serves={serves} />

                {/* <Utensils utensils={utensils} /> */}
              </Aside>

              <div>
                <Paragraph>
                  <InlineTextarea name="description" />
                </Paragraph>

                <Instructions instructions={instructions} />
              </div>
            </Content>
          </InlineForm>
        </article>
      </RecipeLayout>
    </Fragment>
  );
}

RecipePage.theme = foodTheme;

export default withTina(RecipePage);
