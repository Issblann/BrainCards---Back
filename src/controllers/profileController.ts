import { Request, Response } from 'express';
import ProfileService from '../services/profileService';

class ProfileController {
  async getProfile(req: Request, res: Response) {
    // Get user profile
    try {
      const userId = req.params.userId;
      if (!userId) throw new Error('User id is required');
      const profile = await ProfileService.getProfileByUserId(userId);
      if (!profile) res.status(404).json({ message: 'Profile not found' });
      res.json(profile);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default new ProfileController();
