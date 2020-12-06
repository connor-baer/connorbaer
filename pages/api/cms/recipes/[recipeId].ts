import { NextApiRequest, NextApiResponse } from 'next';
import { Recipe } from '@prisma/client';

import { prisma } from '../../../../prisma/client';
import { parseId } from '../../../../utils/id';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const recipeId = parseId(req.query.recipeId);

    switch (req.method) {
      case 'PUT': {
        const recipe = req.body as Recipe;

        await prisma.recipe.update({
          where: { id: recipeId },
          data: recipe,
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
