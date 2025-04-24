import { User } from '../generated/prisma/client'; // Или ваш тип пользователя

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>; // Исключаем пароль из типа
    }
  }
}