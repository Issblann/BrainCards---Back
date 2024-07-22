import { PrismaClient } from '@prisma/client';
import { IDeckRepository } from '../../domain/repositories/IDeckRepository';
import { Deck } from '../../domain/entities/Deck';

class PrismaDeckRepository implements IDeckRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createDeck(deck: Deck): Promise<any> {
    //cambiar any por Deck
    const resultCreateDeck = await this.prismaClient.deck.create({
      data: {
        title: deck.title,
        userId: deck.userId,
        boxId: deck.boxId,
        FlashCard: {
          create: deck.FlashCard.map((flashCard) => {
            return {
              question: flashCard.question,
              answer: flashCard.answer,
              image: flashCard.image,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          }),
        },

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(resultCreateDeck);
    return resultCreateDeck;
  }

  // await getDecksByUserId(userId: string): Promise<Deck[]> {}

  // await getDecksByBoxId(boxId: string): Promise<Deck[]> {}
}

export { PrismaDeckRepository };
