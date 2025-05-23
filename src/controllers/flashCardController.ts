import { Request, Response } from 'express';
import FlashCardService from '../services/flashCardService';
import { EnumDifficultyLevel } from '../domain/entities/FlashCard';

class FlashCardController {
  async createFlashCards(req: Request, res: Response) {
    const { topic, description, quantityFlashcards, difficultyLevel } =
      req.body;
    const { deckId } = req.params;
    try {
      if (!topic) {
        res.status(400).json({ error: 'Topic is required' });
        return;
      }
      if (
        !quantityFlashcards ||
        !Number.isInteger(quantityFlashcards) ||
        quantityFlashcards <= 0
      ) {
        res.status(400).json({
          error:
            'The quantity of the flashcards is required and must be a positive integer',
        });
        return;
      }
      if (
        !difficultyLevel ||
        !Object.values(EnumDifficultyLevel).includes(difficultyLevel)
      ) {
        res.status(400).json({
          error:
            'Difficulty level is required and must be one of Easy, Medium, Hard',
        });
        return;
      }
      const flashCardRequest = {
        topic,
        description,
        quantityFlashcards,
        difficultyLevel,
      };

      const newFlashCards = await FlashCardService.createFlashCards(
        flashCardRequest,
        deckId
      );
      return res.status(201).json(newFlashCards);
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  }

  async getFlashCardsByDeckId(req: Request, res: Response) {
    const { deckId } = req.params;
    try {
      if (!deckId) {
        res.status(400).json({ error: 'Deck ID is required' });
        return;
      }
      const flashCards = await FlashCardService.getFlashCardsByDeckId(deckId);
      return res.status(200).json(flashCards);
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
