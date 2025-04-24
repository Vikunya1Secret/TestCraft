import { PrismaClient } from '../generated/prisma/client';
import { jwtConfig } from './config/auth.config';
import { TokenPayload, AuthUser } from './types/auth';
import {
  UserExistsError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError,
} from './errors/auth';
import { hashPassword, comparePasswords } from './utils/auth-helpers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const AuthService = {
  async isUserExists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user !== null;
  },

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    if (await this.isUserExists(email)) {
      throw new UserExistsError();
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  async login(email: string, password: string): Promise<{ user: AuthUser; token: string }> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) throw new UserNotFoundError();
    if (!(await comparePasswords(password, user.password))) {
      throw new InvalidPasswordError();
    }

    const token = this.generateToken(user.id, user.email, user.role);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  generateToken(userId: number, email: string, role?: string): string {
    const payload: TokenPayload = { id: userId, email, role };
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn }  as jwt.SignOptions);
  },

  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, jwtConfig.secret) as TokenPayload;
    } catch (error) {
      throw new InvalidTokenError();
    }
  },

  async getUserByToken(token: string): Promise<AuthUser | null> {
    const payload = this.verifyToken(token);
    return prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  async getUsers(): Promise<AuthUser[]> {
    try {
      return await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      });
    } catch (error) {
      throw new Error('Не удалось получить пользователей');
    }
  },
};