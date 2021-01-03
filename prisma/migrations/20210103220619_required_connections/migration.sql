/*
  Warnings:

  - You are about to drop the column `recipeId` on the `utensils` table. All the data in the column will be lost.
  - Made the column `recipeId` on table `instructions` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "utensils" DROP CONSTRAINT "utensils_recipeId_fkey";

-- AlterTable
ALTER TABLE "instructions" ALTER COLUMN "recipeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "utensils" DROP COLUMN "recipeId";

-- CreateTable
CREATE TABLE "_RecipeToUtensil" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUtensil_AB_unique" ON "_RecipeToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToUtensil_B_index" ON "_RecipeToUtensil"("B");

-- AddForeignKey
ALTER TABLE "_RecipeToUtensil" ADD FOREIGN KEY("A")REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUtensil" ADD FOREIGN KEY("B")REFERENCES "utensils"("id") ON DELETE CASCADE ON UPDATE CASCADE;
