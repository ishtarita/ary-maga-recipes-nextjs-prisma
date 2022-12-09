// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { nameRecipe, ingredients, preparation } = req.body; 


  const session = await getSession({ req });

  const result = await prisma.recipes.create({
    data:  {
      nameRecipe: nameRecipe,
      ingredients: ingredients,
      preparation: preparation,
      writer: { connect: { email: session?.user?.email } },
    },

  })
  res.json(result);
  
}
