import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import flashCardController from '../controllers/flashCardController';

const router = Router();

router.post(
  '/createFlashCards/:deckId',
  authMiddleware,
  flashCardController.createFlashCards
);
router.get(
  '/getFlashcardsByDeckId/:deckId',
  authMiddleware,
  flashCardController.getFlashCardsByDeckId
);
export default router;
