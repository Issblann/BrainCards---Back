import { PrismaBoxRepository } from '../infrastructure/repositories/PrismaBoxRepository';
import prisma from '../infrastructure/database/prismaClient';
import { Box } from '../domain/entities/Box';

const boxRepository = new PrismaBoxRepository(prisma);
class BoxService {
  async createBox(box: Box): Promise<Box> {
    return await boxRepository.createBox(box);
  }

  async getBoxesByUserId(userId: string): Promise<Box[]> {
    return await boxRepository.getBoxesByUserId(userId);
  }
}

export default new BoxService();
