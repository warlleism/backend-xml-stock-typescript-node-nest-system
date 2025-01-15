/*
  Warnings:

  - You are about to drop the column `principleActiveid` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_principleActiveid_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "principleActiveid",
ADD COLUMN     "principleactiveid" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_principleactiveid_fkey" FOREIGN KEY ("principleactiveid") REFERENCES "PrincipleActive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
