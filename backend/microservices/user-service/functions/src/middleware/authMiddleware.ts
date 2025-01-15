import { RequestHandler } from 'express'
import { verifyToken } from '../services/authService.js'

export const authMiddleware: RequestHandler = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid')
    }

    const token = authHeader.split(' ')[1] as string
    const decoded = verifyToken(token)
    
    req.user = { userId: decoded.userId }
    
    next()
  } catch (error: any) {
    next(new Error(error.message))
  }
}