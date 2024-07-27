import { PrismaClient } from '@prisma/client';
import { IBoxRepository } from '../../domain/repositories/IBoxRepository';
import { Box } from '../../domain/entities/Box';

class PrismaBoxRepository implements IBoxRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createBox(box: Box): Promise<any> {
    const existingBox = await this.prismaClient.box.findFirst({
      where: {
        boxName: box.boxName,
        userId: box.userId,
      },
      include: {
        decks: true,
      },
    });

    if (existingBox) return existingBox;

    const newBox = await this.prismaClient.box.create({
      data: {
        boxName: box.boxName,
        userId: box.userId,
        decks: {
          create: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        decks: true,
      },
    });
    return newBox;
  }

  async getBoxesByUserId(userId: string): Promise<Box[]> {
    const resultGetBoxesByUserId = await this.prismaClient.box.findMany({
      where: {
        userId: userId,
      },
      include: {
        decks: true,
      },
    });
    return resultGetBoxesByUserId;
  }
}

export { PrismaBoxRepository };
