import { Router } from 'express';
import { getCompletion } from '../config/openai.config';

const router = Router();

router.post('/test', async (req, res) => {
  const testPrompt = req.body.prompt || 'How many coutries are there in LATAM?';
  try {
    const completion = await getCompletion(testPrompt);
    res.status(200).json({ completion });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get completion' });
  }
});

export default router;
