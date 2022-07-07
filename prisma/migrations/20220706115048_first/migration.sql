-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Functionario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hash_password" TEXT NOT NULL,

    CONSTRAINT "Functionario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
