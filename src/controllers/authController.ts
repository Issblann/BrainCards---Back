import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    // Register user

    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password)
        throw new Error('All fields are required');
      const user = await authService.register(email, username, password);
      res.json(user);
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
      if (!email || !password) throw new Error('All fields are required');
      const user = await authService.login(email, password);

      const token = authService.generateToken(user);

      res.cookie('token', token, { httpOnly: true });
      res.json({ ...user, message: 'Logged in successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user;
      if (!userId) {
        return (res as any).status(401).json({ error: 'User not found' });
      }
      await authService.logout(userId);

      res.clearCookie('token');
      res.status(200).send({ meesage: 'Logged out successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An unknown error occurred with logout' });
    }
  }
}

export default new AuthController();
