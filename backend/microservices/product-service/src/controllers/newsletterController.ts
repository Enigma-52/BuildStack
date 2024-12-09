import { RequestHandler } from 'express'
import * as newsletterService from '../services/newsletterService'

export const subscribe: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body

    console.log(email);

    if (!email) {
      throw new Error;
    }

    const subscriber = await newsletterService.subscribe({ email })
    res.status(201).json(subscriber)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const sendWeeklyNewsletter: RequestHandler = async (req, res, next) => {
  try {
    const result = await newsletterService.sendWeeklyNewsletter()
    res.status(200).json(result)
  } catch (error: any) {
    throw new Error(error.message)
  }
}