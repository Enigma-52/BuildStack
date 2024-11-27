import { Request, Response, NextFunction } from 'express'

export class HttpException extends Error {
  status: number
  override message: string
  
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack)
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
    timestamp: new Date().toISOString()
  })
}