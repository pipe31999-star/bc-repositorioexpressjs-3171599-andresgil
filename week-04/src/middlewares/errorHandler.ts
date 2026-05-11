import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(`[AppError] ${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Unexpected errors
  logger.error(`[UnhandledError] ${err.message}\n${err.stack}`);
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};
