import { RequestHandler } from 'express'
import * as authService from '../services/authService'
import { HttpException } from '../middleware/errorMiddleware'

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await authService.signup({ name, email, password })
    res.status(201).json(user)
  } catch (error: any) {
    next(new HttpException(400, error.message))
  }
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.login({ email, password })
    res.status(200).json(user)
  } catch (error: any) {
    next(new HttpException(401, error.message))
  }
}

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if (!userId) {
      throw new HttpException(401, 'Unauthorized')
    }

    const user = await authService.getUserById(userId)
    res.status(200).json(user)
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message))
  }
}