import { Request, Response } from 'express';
import DeckService from '../services/deckService';
import { Deck } from '../domain/entities/Deck';

class DeckController {
  async createDeck(req: Request, res: Response): Promise<void | Deck> {
    const { title, description, boxId } = req.body;
    const { userId } = req.params;
    try {
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }

      if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }
      const deck = {
        title,
        description,
        userId,
        boxId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newDeck = await DeckService.createDeck(deck);
      res.json(newDeck);
    } catch (error) {
      let errorMessage = 'An unknown error occurred creating the deck';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(500).json({ error: errorMessage });
    }
  }

  async getDecksByUserId(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const decks = await DeckService.getDecksByUserId(userId);
      res.json(decks);
    } catch (error) {
      res.status(500).json({
        error: 'An unknown error occurred getting the decks by userId',
      });
    }
  }
}
export default new DeckController();
