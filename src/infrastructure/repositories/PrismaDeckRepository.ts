import { PrismaClient } from '@prisma/client';
import { IDeckRepository } from '../../domain/repositories/IDeckRepository';
import { Deck } from '../../domain/entities/Deck';

class PrismaDeckRepository implements IDeckRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createDeck(deck: Deck): Promise<Deck> {
    const resultCreateDeck = await this.prismaClient.deck.create({
      data: {
        title: deck.title,
        description: deck.description,
        userId: deck.userId || '',
        boxId: deck.boxId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log(resultCreateDeck);

    await this.prismaClient.box.update({
      where: {
        id: deck.boxId ?? undefined,
      },
      data: {
        decks: {
          connect: { id: resultCreateDeck.id },
        },
      },
    });
    const allBox = await this.prismaClient.box.findFirst({
      where: {
        boxName: 'All',
        userId: deck.userId,
      },
    });

    if (allBox) {
      await this.prismaClient.box.update({
        where: {
          id: allBox.id,
        },
        data: {
          decks: {
            connect: {
              id: resultCreateDeck.id,
            },
          },
        },
      });
    }
    return resultCreateDeck;
  }

  async getDecksByUserId(userId: string): Promise<Deck[]> {
    const resultGetDecksByUserId = await this.prismaClient.deck.findMany({
      where: {
        userId: userId,
      },
      include: {
        flashCards: true,
      },
    });
    return resultGetDecksByUserId;
  }

  async getDeckById(id: string): Promise<Deck> {
    const resultGetDeckById = await this.prismaClient.deck.findUnique({
      where: {
        id: id,
      },
      include: {
        flashCards: true,
      },
    });

    if (!resultGetDeckById) {
      throw new Error(`Deck with id ${id} not found`);
    }

    return resultGetDeckById;
  }
}

export { PrismaDeckRepository };
