import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  _req: Request,  
  res: Response,
  _next: NextFunction  
) => {
  console.error(err.stack);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
};
