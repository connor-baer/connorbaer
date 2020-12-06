import { NextApiRequest, NextApiResponse } from 'next';
import { Recipe } from '@prisma/client';

import { prisma } from '../../../../prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      const recipe = req.body as Recipe;

      const created = await prisma.recipe.create({
        data: recipe,
      });

      res.status(200).json(created);
      break;
    }
    default: {
      break;
    }
  }
};
