export interface TokenPayload {
    id: number;
    email: string;
    role?: string;
  }
  
  export type AuthUser = {
    id: number;
    name: string;
    email: string;
    role?: string;
    createdAt: Date;
  };