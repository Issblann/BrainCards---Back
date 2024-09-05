import { FlashCard, FlashCardRequest } from '../entities/FlashCard';

export interface IFlashCardsRepository {
  createFlashCards(
    flashCardRequest: FlashCardRequest,
    deckId: string
  ): Promise<FlashCard[]>;
  // getFlashCardById(id: string): Promise<FlashCard | null>;
  // getFlashCardsByDeckId(deckId: string): Promise<FlashCard[]>;
  updateFlashCardById(
    id: string,
    flashCard: FlashCard
  ): Promise<Partial<FlashCard>>;
}
