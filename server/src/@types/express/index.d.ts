import { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      role: UserRole;
    }

    interface Request {
      user?: User;
    }
  }
}