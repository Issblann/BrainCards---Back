import { PrismaClient } from '@prisma/client';
import { IFlashCardsRepository } from '../../domain/repositories/IFlashCardsRepository';
import { FlashCard } from '../../domain/entities/FlashCard';

class PrismaFlashCardRepository implements IFlashCardsRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createFlashCard(flashCard: FlashCard): Promise<FlashCard> {
    const resultCreateFlashCard = await this.prismaClient.flashCard.create({
      data: {
        deckId: flashCard.deckId,
        question: flashCard.question,
        answer: flashCard.answer,
        image: flashCard.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(resultCreateFlashCard);
    return resultCreateFlashCard;
  }

  async updateFlashCardById(
    id: string,
    flashCard: FlashCard
  ): Promise<Partial<FlashCard>> {
    const flashCardData = await this.prismaClient.flashCard.update({
      where: { id: id },
      data: {
        deckId: flashCard.deckId,
        question: flashCard.question,
        answer: flashCard.answer,
        image: flashCard.image,
        updatedAt: new Date(),
      },
    });

    return flashCardData;
  }
}

export { PrismaFlashCardRepository };
