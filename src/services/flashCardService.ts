import { FlashCard } from '../domain/entities/FlashCard';
import prisma from '../infrastructure/database/prismaClient';
import { PrismaFlashCardRepository } from '../infrastructure/repositories/PrismaFlashCardRepository';

const flashCardRepository = new PrismaFlashCardRepository(prisma);

class FlashCardService {
  async createFlashCard(flashCard: FlashCard): Promise<FlashCard> {
    return await flashCardRepository.createFlashCard(flashCard);
  }
}
export default new FlashCardService();
