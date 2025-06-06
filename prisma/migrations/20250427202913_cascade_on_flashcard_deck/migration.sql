-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_deckId_fkey";

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
