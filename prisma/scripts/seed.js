/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
const faker = require('faker');
const pick = require('lodash/fp/pick');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const combinations = {};

function connect(data, relations, key) {
  if (!relations) {
    return;
  }

  const createConnections = () => {
    const connections = relations.map(
      ({ name, items, type = 'one-to-many', reference = 'id', ...rest }) => {
        let relation;

        switch (type) {
          case 'one-to-one': {
            relation = pick(reference, faker.random.arrayElement(items));
            break;
          }
          case 'one-to-many': {
            const { min = 0, max = items.length } = rest;
            const count = faker.random.number({ min, max });
            relation = faker.random
              .arrayElements(items, count)
              .map(pick(reference));
            break;
          }
          default:
            throw new Error(`Type "${type}" is not supported.`);
        }

        return { name, relation, reference };
      },
    );

    if (key) {
      combinations[key] = combinations[key] || {};

      const hash = connections
        .map(
          ({ name, relation, reference }) => `${name}-${relation[reference]}`,
        )
        .join(',');

      if (combinations[key][hash]) {
        createConnections();
        return;
      }

      combinations[key][hash] = true;
    }

    connections.forEach(({ name, relation }) => {
      data[name] = { connect: relation };
    });
  };

  createConnections();
}

function seedMultiple(count, fn, relations) {
  return Promise.all(
    Array(count)
      .fill()
      .map((_, index) => fn(relations, index)),
  );
}

function seedRecipe(relations) {
  const data = {
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    serves: faker.random.number(8),
    prepTime: faker.random.number({ min: 5, max: 60, precision: 5 }),
    cookTime: faker.random.number({ min: 10, max: 120, precision: 10 }),
  };

  connect(data, relations);

  return prisma.recipe.create({ data });
}

function seedTag() {
  const data = {
    title: faker.random.word(),
  };

  return prisma.tag.create({ data });
}

function seedImage() {
  const key = Math.round(Math.random() * 10000);
  const data = {
    src: `https://source.unsplash.com/3000x3000/?food,drink,${key}`,
    alt: faker.lorem.sentence(),
    color: faker.commerce.color(),
  };

  return prisma.image.create({ data });
}

const INGREDIENTS = [
  'milk',
  'avocado',
  'zucchini',
  'mango',
  'halloumi',
  'soy sauce',
];

function seedIngredient(relations, index) {
  const data = {
    title: INGREDIENTS[index],
  };

  return prisma.ingredient.create({ data });
}

function seedInstruction(relations, index) {
  const data = {
    step: index,
    content: faker.lorem.paragraph(),
  };

  connect(data, relations);

  return prisma.instruction.create({ data });
}

const UNITS = [
  'Liter',
  'Milliliter',
  'Gallon',
  'FluidOunce',
  'Tablespoon',
  'Teaspoon',
  'Kilogram',
  'Gram',
  'Pound',
  'Ounce',
  'Meter',
  'Centimeter',
  'Millimeter',
  'Foot',
  'Inch',
];

function seedIngredientInRecipe(relations) {
  const data = {
    count: faker.random.number(5),
    unit: faker.random.arrayElement(UNITS),
    description: faker.lorem.sentence(),
  };

  connect(data, relations, 'ingredient-in-recipe');

  return prisma.ingredientInRecipe.create({ data });
}

async function main() {
  try {
    const images = await seedMultiple(20, seedImage);
    const tags = await seedMultiple(20, seedTag);
    const ingredients = await seedMultiple(INGREDIENTS.length, seedIngredient);
    const instructions = await seedMultiple(100, seedInstruction);
    const recipes = await seedMultiple(20, seedRecipe, [
      { name: 'image', items: images, type: 'one-to-one', reference: 'src' },
      { name: 'tags', items: tags, min: 2, max: 5 },
      { name: 'instructions', items: instructions, min: 3, max: 9 },
    ]);

    await seedMultiple(100, seedIngredientInRecipe, [
      { name: 'recipe', items: recipes, type: 'one-to-one' },
      { name: 'ingredient', items: ingredients, type: 'one-to-one' },
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

main();
