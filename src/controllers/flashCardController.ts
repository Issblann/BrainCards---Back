import { Request, Response } from 'express';
import FlashCardService from '../services/flashCardService';

class FlashCardController {
  async createFlashCard(req: Request, res: Response) {
    const { question, answer, image } = req.body;
    const { deckId } = req.params;
    try {
      if (!question) {
        res.status(400).json({ error: 'Question is required' });
        return;
      }
      if (!answer) {
        res.status(400).json({ error: 'Answer is required' });
        return;
      }
      if (!deckId) {
        res.status(400).json({ error: 'Deck ID is required' });
        return;
      }

      const flashCard = {
        deckId,
        question,
        answer,
        image: image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newFlashCard = await FlashCardService.createFlashCard(flashCard);
      return res.status(201).json(newFlashCard);
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  }
}
export default new FlashCardController();
