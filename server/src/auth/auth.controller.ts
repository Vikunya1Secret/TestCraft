import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { validationResult } from 'express-validator';
import {
  UserExistsError,
  UserNotFoundError,
  InvalidPasswordError,
} from './errors/auth'; // Импортируем кастомные ошибки

export const authController = {
  async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          message: "Ошибка валидации",
          errors: errors.array() 
        });
        return;
      }

      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ 
          message: "Ошибка валидации",
          errors: errors.array() 
        });
        return;
      }

      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      
      res.status(200).json({ 
        message: 'Успешный вход',
        user,
        token 
      });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Необходима авторизация' });
        return;
      }

      await AuthService.verifyToken(token);
      
      const users = await AuthService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'Необходима авторизация' });
        return;
      }

      const user = await AuthService.getUserByToken(token);
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};