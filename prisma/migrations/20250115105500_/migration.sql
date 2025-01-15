/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PrincipleActive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PrincipleActive_name_key" ON "PrincipleActive"("name");
