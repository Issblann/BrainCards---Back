import { FlashCard } from '../entities/FlashCard';

export interface IFlashCardsRepository {
  createFlashCard(flashCard: FlashCard): Promise<FlashCard>;
  // getFlashCardById(id: string): Promise<FlashCard | null>;
  // getFlashCardsByDeckId(deckId: string): Promise<FlashCard[]>;
  updateFlashCardById(
    id: string,
    flashCard: FlashCard
  ): Promise<Partial<FlashCard>>;
}
