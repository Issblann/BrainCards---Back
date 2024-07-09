import { Request, Response } from 'express';
import ProfileService from '../services/profileService';

class ProfileController {
  async getProfile(req: Request, res: Response) {
    // Get user profile

    const { userId } = req.params;
    try {
      if (!userId) throw new Error('User id is required');
      const profile = await ProfileService.getProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ message: 'Server error', error });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default new ProfileController();
