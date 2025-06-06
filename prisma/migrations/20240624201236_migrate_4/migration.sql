/*
  Warnings:

  - You are about to drop the `_BoxToFlashCard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `boxId` to the `FlashCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoxToFlashCard" DROP CONSTRAINT "_BoxToFlashCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoxToFlashCard" DROP CONSTRAINT "_BoxToFlashCard_B_fkey";

-- AlterTable
ALTER TABLE "FlashCard" ADD COLUMN     "boxId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BoxToFlashCard";

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
