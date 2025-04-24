import { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  if (err instanceof PrismaClientKnownRequestError) {
    res.status(400).json({
      status: 'error',
      code: err.code,
      message: 'Database error occurred'
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Unknown error occurred'
  });
};