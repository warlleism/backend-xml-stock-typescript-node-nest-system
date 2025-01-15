/*
  Warnings:

  - Made the column `categoryid` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `principleactiveid` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryid_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_principleactiveid_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryid" SET NOT NULL,
ALTER COLUMN "principleactiveid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_principleactiveid_fkey" FOREIGN KEY ("principleactiveid") REFERENCES "PrincipleActive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
