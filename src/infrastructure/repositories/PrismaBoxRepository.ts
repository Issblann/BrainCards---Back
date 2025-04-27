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

    const boxToCreate = {
      boxName: box.boxName,
      userId: box.userId || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const newBox = await this.prismaClient.box.create({ data: boxToCreate });
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

  async getBoxById(id: string): Promise<Box | null> {
      const box = await this.prismaClient.box.findUnique({
          where: {
              id,
          },
          include: {
              decks: true,
          },
      });
      return box;
  }

  async updateBox(id: string, boxData: Partial<Box>): Promise<Box | null> {
      const updatedBox = await this.prismaClient.box.update({
          where: {
              id,
          },
          data: {
              boxName: boxData.boxName,
              updatedAt: new Date(),
          },
          include: {
              decks: true,
          },
      });
      return updatedBox;
  }

  async deleteBox(id: string): Promise<void> {
      await this.prismaClient.box.delete({
          where: {
              id,
          },
      });
  }
}



export { PrismaBoxRepository };
