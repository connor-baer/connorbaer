import { Recipe } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const recipeId = parseInt(req.query.recipeId as string, 10);
    const recipe = req.body as Recipe;

    switch (req.method) {
      case 'PUT': {
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
