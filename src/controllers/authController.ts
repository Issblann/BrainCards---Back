import { Request, Response } from 'express';
import authService from '../services/authService';
import User from '../domain/entities/User';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    // Register user

    try {
      const { email, username, password } = req.body;

      const token = await authService.register(email, username, password);
      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    // Login user
    try {
      const { email, password } = req.body;

      const token = await authService.login(email, password);

      res.json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Logged out successfully' });
  }
}

export default new AuthController();
