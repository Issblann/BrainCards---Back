import { Router } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/api', profileRoutes);
export default router;
