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
    const { userId } = req.query;
    console.log(userId);
    if (!userId || typeof userId !== 'string') {
      throw new HttpException(400, 'User ID is required');
    }

    const user = await authService.getUserById(userId)
    console.log(user);
    res.status(200).json(user)
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message))
  }
}

export const sendOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body
    
    if (!email) {
      throw new HttpException(400, 'Email is required')
    }

    const result = await authService.sendOTP(email)
    res.status(200).json(result)
  } catch (error: any) {
    next(new HttpException(error.status || 500, error.message))
  }
}

export const verifyOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    
    if (!email || !otp) {
      throw new HttpException(400, 'Email and OTP are required')
    }

    const result = await authService.verifyOTP(email, otp)
    res.status(200).json(result)
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message))
  }
}