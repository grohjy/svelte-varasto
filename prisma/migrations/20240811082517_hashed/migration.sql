-- AlterTable
ALTER TABLE "Item" ADD COLUMN "recipeDefQty" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "hashedPassword" TEXT;
