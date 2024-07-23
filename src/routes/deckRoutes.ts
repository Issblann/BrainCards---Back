import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import deckController from '../controllers/deckController';

const router = Router();

router.post('/createDeck/:userId', authMiddleware, deckController.createDeck);
router.get(
  '/getDecksByUserId/:userId',
  authMiddleware,
  deckController.getDecksByUserId
);
export default router;
