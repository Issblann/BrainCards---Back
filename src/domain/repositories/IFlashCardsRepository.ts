import { FlashCard, FlashCardRequest } from '../entities/FlashCard';

export interface IFlashCardsRepository {
  createFlashCards(
    flashCardRequest: FlashCardRequest,
    deckId: string
  ): Promise<FlashCard[]>;
  getFlashCardsByDeckId(deckId: string): Promise<FlashCard[]>;
  updateFlashCardById(
    id: string,
    flashCard: FlashCard
  ): Promise<Partial<FlashCard>>;
  deleteFlashCardById(id: string): Promise<void>;
}
