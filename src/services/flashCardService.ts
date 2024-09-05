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
}
export default new FlashCardService();
