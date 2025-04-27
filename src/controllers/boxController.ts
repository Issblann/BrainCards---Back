import { Request, Response } from 'express';
import boxService from '../services/boxService';

class BoxController {
  async createBox(req: Request, res: Response) {
    const { boxName } = req.body;
    const { userId } = req.params;
    try {
      if (!boxName) {
        return res.status(400).json({ error: 'Box name is required' });
      }
      if (!userId) {
        return res.status(400).json({ error: 'User id is required' });
      }
      const box = {
        boxName,
        userId,
        decks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newBox = await boxService.createBox(box);
      return res.status(201).json(newBox);
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  }

  async getBoxesByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      if (!userId) {
        return res.status(400).json({ error: 'User id is required' });
      }
      const boxes = await boxService.getBoxesByUserId(userId);
      return res.status(200).json(boxes);
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  }

  async getBoxById(req: Request, res: Response) {
      const { id } = req.params;
      try {
          if (!id) {
              return res.status(400).json({ error: 'Box id is required' });
          }
          const box = await boxService.getBoxById(id);
          if (!box) {
              return res.status(404).json({ error: 'Box not found' });
          }
          return res.status(200).json(box);
      } catch (error) {
          let errorMessage = 'An unknown error occurred';
          if (error instanceof Error) {
              errorMessage = error.message;
          }
          res.status(500).json({ error: errorMessage });
      }
  }

  async updateBox(req: Request, res: Response) {
      const { id } = req.params;
      const boxData = req.body;
      try {
          if (!id) {
              return res.status(400).json({ error: 'Box id is required' });
          }
          const updatedBox = await boxService.updateBox(id, boxData);
          if (!updatedBox) {
              return res.status(404).json({ error: 'Box not found' });
          }
          return res.status(200).json(updatedBox);
      } catch (error) {
          let errorMessage = 'An unknown error occurred';
          if (error instanceof Error) {
              errorMessage = error.message;
          }
          res.status(500).json({ error: errorMessage });
      }
  }

  async deleteBox(req: Request, res: Response) {
      const { id } = req.params;
      try {
          if (!id) {
              return res.status(400).json({ error: 'Box id is required' });
          }
          await boxService.deleteBox(id);
          return res.status(200).send({ message: 'Box deleted successfully' });
      } catch (error) {
          let errorMessage = 'An unknown error occurred';
          if (error instanceof Error) {
              errorMessage = error.message;
          }
          res.status(500).json({ error: errorMessage });
      }
  }
}
export default new BoxController();
