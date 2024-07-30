-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_boxId_fkey";

-- CreateTable
CREATE TABLE "_DecksOnBoxes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DecksOnBoxes_AB_unique" ON "_DecksOnBoxes"("A", "B");

-- CreateIndex
CREATE INDEX "_DecksOnBoxes_B_index" ON "_DecksOnBoxes"("B");

-- AddForeignKey
ALTER TABLE "_DecksOnBoxes" ADD CONSTRAINT "_DecksOnBoxes_A_fkey" FOREIGN KEY ("A") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DecksOnBoxes" ADD CONSTRAINT "_DecksOnBoxes_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
