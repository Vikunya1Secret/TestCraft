import { RequestHandler } from 'express';
import { AuthService } from '../auth.service';
import { InvalidTokenError } from '../errors/auth';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) throw new InvalidTokenError();
    
    const user = await AuthService.getUserByToken(token);
    if (!user) throw new InvalidTokenError();

    // Явное приведение типа к Express.User
    req.user = user as Express.User;
    
    next();
  } catch (error) {
    next(error);
  }
};