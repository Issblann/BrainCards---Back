import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import envs from '../../config/env';
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }
  if (!envs.jwtSecret) {
    throw new Error('JWT Secret is not defined');
  }
  try {
    const decoded = jwt.verify(token, envs.jwtSecret);
    if (typeof decoded === 'object' && 'id' in decoded) {
      (req as any).user = (decoded as JwtPayload).id;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
