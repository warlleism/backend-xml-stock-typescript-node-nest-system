/*
  Warnings:

  - You are about to drop the column `principleActivePrincipleId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_principleActivePrincipleId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "principleActivePrincipleId",
ADD COLUMN     "principleActiveId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_principleActiveId_fkey" FOREIGN KEY ("principleActiveId") REFERENCES "PrincipleActive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
