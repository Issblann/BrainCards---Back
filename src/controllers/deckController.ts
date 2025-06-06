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

  async getDeckById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deck = await DeckService.getDeckById(id);
      res.json(deck);
    } catch (error) {
      res.status(500).json({
        error: 'An unknown error occurred getting the deck by id',
      });
      throw error;
    }
  }

  async updateDeck(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, description, boxId } = req.body;
    try {
      if (!id) {
        res.status(400).json({ error: 'Deck ID is required' });
        return;
      }

      // Fetch the existing deck to get userId and createdAt
      const existingDeck = await DeckService.getDeckById(id);
      if (!existingDeck) {
        res.status(404).json({ error: 'Deck not found' });
        return;
      }

      const deck: Deck = {
        id,
        title,
        description,
        boxId,
        userId: existingDeck.userId,
        createdAt: existingDeck.createdAt,
        updatedAt: new Date(),
      };
      const updatedDeck = await DeckService.updateDeck(deck);
      res.json(updatedDeck);
    } catch (error) {
      res.status(500).json({
        error: 'An unknown error occurred updating the deck',
      });
    }
  }

  async deleteDeck(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(400).json({ error: 'Deck ID is required' });
        return;
      }
      await DeckService.deleteDeck(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        error: 'An unknown error occurred deleting the deck',
      });
    }
  }
}
export default new DeckController();
