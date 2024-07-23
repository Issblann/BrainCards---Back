import { Router } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import deckRoutes from './deckRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/api', profileRoutes);
router.use('/api/decks', deckRoutes);
export default router;
