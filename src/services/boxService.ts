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

  async getBoxById(id: string): Promise<Box | null> {
    return await boxRepository.getBoxById(id);
  }

  async updateBox(id: string, boxData: Partial<Box>): Promise<Box | null> {
    return await boxRepository.updateBox(id, boxData);
  }

  async deleteBox(id: string): Promise<void> {
    return await boxRepository.deleteBox(id);
  }
}

export default new BoxService();
