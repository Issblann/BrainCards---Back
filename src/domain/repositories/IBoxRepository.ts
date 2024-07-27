import { Box } from '../entities/Box';

export interface IBoxRepository {
  createBox(box: Box): Promise<Box>;
  getBoxesByUserId(userId: string, boxName: string): Promise<Box[]>;
  // updateBox(id: string, box: Box): Promise<Box>;
  // deleteBox(id: string): Promise<void>;
}
