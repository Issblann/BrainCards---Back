import { FlashCard, FlashCardRequest } from '../domain/entities/FlashCard';
import prisma from '../infrastructure/database/prismaClient';
import { PrismaFlashCardRepository } from '../infrastructure/repositories/PrismaFlashCardRepository';

const flashCardRepository = new PrismaFlashCardRepository(prisma);

class FlashCardService {
  async createFlashCards(
    flashCardRequest: FlashCardRequest,
    deckId: string
  ): Promise<FlashCard[]> {
    return await flashCardRepository.createFlashCards(flashCardRequest, deckId);
  }
  async getFlashCardsByDeckId(deckId: string): Promise<FlashCard[]> {
    return await flashCardRepository.getFlashCardsByDeckId(deckId);
  }
  async deleteFlashCardById(id: string): Promise<void> {
    await flashCardRepository.deleteFlashCardById(id);
  }
}
export default new FlashCardService();
