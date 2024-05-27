import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
  res.send('USERS');
});
export default router;
