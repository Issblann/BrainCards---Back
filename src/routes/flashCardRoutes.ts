import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import flashCardController from '../controllers/flashCardController';

const router = Router();

router.post(
  '/createFlashCards/:deckId',
  authMiddleware,
  flashCardController.createFlashCards
);
// router.get(
//   '/getDecksByUserId/:userId',
//   authMiddleware,
//   deckController.getDecksByUserId
// );
export default router;
