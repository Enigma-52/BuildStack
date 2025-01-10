import { RequestHandler } from 'express'
import { verifyToken } from '../services/authService.js'
import { HttpException } from './errorMiddleware.js'

export const authMiddleware: RequestHandler = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(401, 'No token provided')
    }

    const token = authHeader.split(' ')[1] as string
    const decoded = verifyToken(token)
    
    req.user = { userId: decoded.userId }
    
    next()
  } catch (error: any) {
    next(new HttpException(401, error.message))
  }
}