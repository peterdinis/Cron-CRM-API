/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "int",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" SET DATA TYPE TEXT;
