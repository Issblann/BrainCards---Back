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
  
    return resultCreateDeck;
  }

  async getDecksByUserId(userId: string): Promise<Deck[]> {
    const resultGetDecksByUserId = await this.prismaClient.deck.findMany({
      where: {
        userId: userId,
      },
      include: {
        flashCards: true,
        boxes: {
          select: {
            boxName: true,
          }
        }
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

  async updateDeck(deck: Deck): Promise<Deck> {
    const resultUpdateDeck = await this.prismaClient.deck.update({
      where: {
        id: deck.id,
      },
      data: {
        title: deck.title,
        description: deck.description,
        boxId: deck.boxId, 
        updatedAt: new Date(),
      },
    });

    return resultUpdateDeck;
  }

  async deleteDeck(id: string): Promise<void> {
    await this.prismaClient.deck.delete({
      where: {
        id: id,
      },
    });
  }
}

export { PrismaDeckRepository };
