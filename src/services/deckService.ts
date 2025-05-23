import { Deck } from '../domain/entities/Deck';
import prisma from '../infrastructure/database/prismaClient';

import { PrismaDeckRepository } from '../infrastructure/repositories/PrismaDeckRepository';

const deckRepository = new PrismaDeckRepository(prisma);

class DeckService {
  async createDeck(deck: Deck): Promise<Deck> {
    return await deckRepository.createDeck(deck);
  }

  async getDecksByUserId(userId: string): Promise<Deck[]> {
    return await deckRepository.getDecksByUserId(userId);
  }

  async getDeckById(id: string): Promise<Deck> {
    return await deckRepository.getDeckById(id);
  }

  async updateDeck(deck: Deck): Promise<Deck> {
    return await deckRepository.updateDeck(deck);
  }

  async deleteDeck(id: string): Promise<void> {
    return await deckRepository.deleteDeck(id);
  }
}
export default new DeckService();
