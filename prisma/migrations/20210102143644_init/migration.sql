-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('Liter', 'Milliliter', 'Gallon', 'FluidOunce', 'Tablespoon', 'Teaspoon', 'Kilogram', 'Gram', 'Pound', 'Ounce', 'Meter', 'Centimeter', 'Millimeter', 'Foot', 'Inch', 'Celsius', 'Fahrenheit', 'Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year');

-- CreateTable
CREATE TABLE "images" (
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipeId" INTEGER,

    PRIMARY KEY ("src")
);

-- CreateTable
CREATE TABLE "tags" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "recipeId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "serves" INTEGER,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredientsInRecipes" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "unit" "Unit",
    "description" TEXT,

    PRIMARY KEY ("recipeId","ingredientId")
);

-- CreateTable
CREATE TABLE "ingredients" (
"id" SERIAL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utensils" (
"id" SERIAL,
    "title" TEXT NOT NULL,
    "recipeId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructions" (
"id" SERIAL,
    "step" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "recipeId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "images.alt_index" ON "images"("alt");

-- CreateIndex
CREATE UNIQUE INDEX "images_recipeId_unique" ON "images"("recipeId");

-- CreateIndex
CREATE INDEX "tags.title_index" ON "tags"("title");

-- CreateIndex
CREATE INDEX "recipes.title_index" ON "recipes"("title");

-- CreateIndex
CREATE INDEX "ingredients.title_index" ON "ingredients"("title");

-- CreateIndex
CREATE INDEX "utensils.title_index" ON "utensils"("title");

-- AddForeignKey
ALTER TABLE "images" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsInRecipes" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsInRecipes" ADD FOREIGN KEY("ingredientId")REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utensils" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructions" ADD FOREIGN KEY("recipeId")REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
