import { Deck } from '../entities/Deck';

export interface IDeckRepository {
  createDeck(deck: Deck): Promise<Deck>;
  getDecksByUserId(userId: string): Promise<Deck[]>;
  getDeckById(id: string): Promise<Deck>;
  updateDeck(deck: Deck): Promise<Deck>;
  deleteDeck(id: string): Promise<void>;
}
