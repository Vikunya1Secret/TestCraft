import { ErrorRequestHandler } from 'express';
import {
  UserExistsError,
  UserNotFoundError,
  InvalidPasswordError,
  InvalidTokenError
} from '../errors/auth';

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  console.error(err);

  if (err instanceof UserExistsError) {
    res.status(409).json({ message: err.message });
    return;
  }
  
  if (err instanceof UserNotFoundError) {
    res.status(404).json({ message: err.message });
    return;
  }
  
  if (err instanceof InvalidPasswordError || err instanceof InvalidTokenError) {
    res.status(401).json({ message: err.message });
    return;
  }

  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};