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

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      }
      const token = authService.generateToken(user);
      res.cookie('token', token);
      res.json({ ...user, message: 'Logged in successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  // Logout user
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const cookie = req.cookies.token;
      if (!cookie) throw new Error('Token not provided');
      res.clearCookie('token');
      res.status(200).send({ meesage: 'Logged out successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An unknown error occurred with logout' });
    }
  }

  async googleAuth(req: Request, res: Response): Promise<void> {
    // Google auth
    const { id, email, username, password } = req.body;

    try {
      let user = await authService.findUserByEmail(email);

      if (!user) {
        user = await authService.register(email, username, id);
      } else {
        user = await authService.login(email);
      }

      const token = authService.generateToken(user);
      res.json({ user, token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: 'An unknown error occurred with google auth' });
    }
  }
}

export default new AuthController();
