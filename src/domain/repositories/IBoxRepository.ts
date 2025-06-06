import { Box } from '../entities/Box';

export interface IBoxRepository {
  createBox(box: Box): Promise<Box>;
  getBoxesByUserId(userId: string, boxName: string): Promise<Box[]>;
  getBoxById(id: string): Promise<Box | null>;
  updateBox(id: string, boxData: Partial<Box>): Promise<Box | null>;
  deleteBox(id: string): Promise<void>;
}
