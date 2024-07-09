import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import profileController from '../controllers/profileController';

const router = Router();

router.get('/profile/:userId', authMiddleware, profileController.getProfile);
router.put('/profile/:id', authMiddleware, profileController.updateProfile);
export default router;
