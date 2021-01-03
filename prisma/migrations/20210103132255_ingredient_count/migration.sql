-- AlterTable
ALTER TABLE "ingredientsInRecipes" ALTER COLUMN "count" DROP NOT NULL;

-- AlterTable
ALTER TABLE "utensils" ADD COLUMN     "description" TEXT;
