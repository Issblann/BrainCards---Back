const multer = require('multer');
import { Request, Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import profileController from '../controllers/profileController';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'uploads/');
  },
  filename: function (req: Request, file: any, cb: any) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get('/profile/:userId', authMiddleware, profileController.getProfile);
router.put(
  '/profile/:id',
  authMiddleware,
  upload.single('image'),
  profileController.updateProfile
);
export default router;
