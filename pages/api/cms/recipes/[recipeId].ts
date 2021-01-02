import { NextApiRequest, NextApiResponse } from 'next';
import { Recipe, Image } from '@prisma/client';
import { omit } from 'lodash/fp';

import { prisma } from '../../../../prisma/client';
import { parseId } from '../../../../utils/id';

function upsert<T>(data: T) {
  return {
    upsert: {
      create: data,
      update: data,
    },
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const recipeId = parseId(req.query.recipeId as string);

    switch (req.method) {
      case 'PUT': {
        const { image, ...recipe } = req.body as Recipe & { image: Image };

        const data = { ...recipe, image: upsert(omit('recipeId', image)) };

        await prisma.recipe.update({
          where: { id: recipeId },
          data,
        });
        res.status(204).end();
        break;
      }
      default: {
        break;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
