import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import boxController from '../controllers/boxController';

const router = Router();

router.post('/createBox/:userId', authMiddleware, boxController.createBox);
router.get(
  '/getBoxesByUserId/:userId',
  authMiddleware,
  boxController.getBoxesByUserId
);
export default router;
