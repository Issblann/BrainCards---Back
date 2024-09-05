import { Router } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import deckRoutes from './deckRoutes';
import flashCardsRoutes from './flashCardRoutes';
import boxRoutes from './boxRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/api', profileRoutes);
router.use('/api/decks', deckRoutes);
router.use('/api/flashcards', flashCardsRoutes);
router.use('/api/boxes', boxRoutes);

export default router;
