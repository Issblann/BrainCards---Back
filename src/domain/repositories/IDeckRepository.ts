import { Deck } from '../entities/Deck';

export interface IDeckRepository {
  createDeck(deck: Deck): Promise<Deck>;
  //   getDecksByUserId(userId: string): Promise<Deck[]>;
  //   getDecksByBoxId(boxId: string): Promise<Deck[]>;
  //   updateDeckById(id: string, deck: Deck): Promise<Partial<Deck>>;
  //   deleteDeckById(id: string): Promise<void>;
}
