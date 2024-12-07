import { Router } from 'express'
import * as authController from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/profile', authController.getProfile)
router.put('/profile', authController.updateProfile)
router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOTP)
router.get('/getAllUsers', authController.getAllUsers)

export { router as authRoutes }