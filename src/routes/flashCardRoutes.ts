import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import flashCardController from '../controllers/flashCardController';

const router = Router();

router.post(
  '/createFlashCard/:deckId',
  authMiddleware,
  flashCardController.createFlashCard
);
// router.get(
//   '/getDecksByUserId/:userId',
//   authMiddleware,
//   deckController.getDecksByUserId
// );
export default router;
