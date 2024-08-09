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
}
export default new DeckService();
