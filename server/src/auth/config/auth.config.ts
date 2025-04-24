interface JwtConfig {
    secret: string;
    expiresIn: string | number;
  }

export const jwtConfig: JwtConfig = {
    secret: process.env.JWT_SECRET || 'very-secure-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d', // 1 день
  };