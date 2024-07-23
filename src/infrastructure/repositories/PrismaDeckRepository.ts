import { PrismaClient } from '@prisma/client';
import { IDeckRepository } from '../../domain/repositories/IDeckRepository';
import { Deck } from '../../domain/entities/Deck';

class PrismaDeckRepository implements IDeckRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createDeck(deck: Deck): Promise<Deck> {
    //cambiar any por Deck
    const resultCreateDeck = await this.prismaClient.deck.create({
      data: {
        title: deck.title,
        userId: deck.userId,
        boxId: deck.boxId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(resultCreateDeck);
    return resultCreateDeck;
  }

  async getDecksByUserId(userId: string): Promise<Deck[]> {
    const resultGetDecksByUserId = await this.prismaClient.deck.findMany({
      where: {
        userId: userId,
      },
    });
    return resultGetDecksByUserId;
  }
  //    await getDecksByUserId(userId: string): Promise<Deck[]> {

  //    }

  // await getDecksByBoxId(boxId: string): Promise<Deck[]> {}
}

export { PrismaDeckRepository };
