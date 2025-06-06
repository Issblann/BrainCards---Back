/*
  Warnings:

  - You are about to drop the `_DecksOnBoxes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DecksOnBoxes" DROP CONSTRAINT "_DecksOnBoxes_A_fkey";

-- DropForeignKey
ALTER TABLE "_DecksOnBoxes" DROP CONSTRAINT "_DecksOnBoxes_B_fkey";

-- DropTable
DROP TABLE "_DecksOnBoxes";

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE SET NULL ON UPDATE CASCADE;
