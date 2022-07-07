/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paciente_phone_key" ON "Paciente"("phone");
