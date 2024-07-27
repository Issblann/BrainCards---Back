/*
  Warnings:

  - You are about to drop the column `title` on the `Box` table. All the data in the column will be lost.
  - Added the required column `boxName` to the `Box` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Box" DROP COLUMN "title",
ADD COLUMN     "boxName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "description" TEXT;
