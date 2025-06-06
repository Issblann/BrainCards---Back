import { NextFunction, Request, Response } from 'express';
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

  next();
};

export default authMiddleware;
