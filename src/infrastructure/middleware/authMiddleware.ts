import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import envs from '../../config/env';
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }
  if (!envs.jwtSecret) {
    throw new Error('JWT Secret is not defined');
  }
  try {
    if (token) {
      const decoded = jwt.verify(token, envs.jwtSecret) as JwtPayload;
      (req as any).user = decoded.id;
      next();
    } else {
      res.status(401).json({ message: 'Invalid token structure' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
