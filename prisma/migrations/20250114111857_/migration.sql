/*
  Warnings:

  - Added the required column `dosage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `laboratory` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `principleActive` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiresPrescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dosage" TEXT NOT NULL,
ADD COLUMN     "laboratory" TEXT NOT NULL,
ADD COLUMN     "principleActive" TEXT NOT NULL,
ADD COLUMN     "requiresPrescription" BOOLEAN NOT NULL;
