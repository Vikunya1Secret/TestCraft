import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';
import { InvalidTokenError } from '../errors/auth';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new InvalidTokenError();
    }

    const user = await AuthService.getUserByToken(token);
    if (!user) {
      throw new InvalidTokenError();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};