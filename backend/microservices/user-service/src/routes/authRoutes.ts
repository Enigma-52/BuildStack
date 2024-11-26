import { Router } from 'express'
import * as authController from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/profile', authMiddleware, authController.getProfile)


export { router as authRoutes }