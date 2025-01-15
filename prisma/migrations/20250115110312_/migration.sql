/*
  Warnings:

  - Added the required column `bula` to the `PrincipleActive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrincipleActive" ADD COLUMN     "bula" TEXT NOT NULL;
