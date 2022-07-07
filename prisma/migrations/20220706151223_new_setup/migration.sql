/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Functionario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Functionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Functionario" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Functionario_email_key" ON "Functionario"("email");
