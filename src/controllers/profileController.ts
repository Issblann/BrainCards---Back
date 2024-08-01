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

  // Update user profile
  async updateProfile(req: Request, res: Response) {
    const { name, lastName, bio } = req.body;
    const { id } = req.params;
    try {
      if (!id) throw new Error('Profile id is required');
      const imagePath = req.file ? req.file.path : null;
      const profile = {
        name,
        lastName,
        bio,
        image: imagePath,
      };
      const profileData = await ProfileService.updateProfile(id, profile);
      res.json({ profile: profileData, message: 'Profile updated' });
    } catch (error) {
      if (bio && typeof bio !== 'string') {
        return res.status(400).json({ message: 'Bio must be a string' });
      }
      if (lastName && typeof lastName !== 'string') {
        return res.status(400).json({ message: 'Last name must be a string' });
      }
      if (name && typeof name !== 'string') {
        return res.status(400).json({ message: 'Name must be a string' });
      }
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export default new ProfileController();
