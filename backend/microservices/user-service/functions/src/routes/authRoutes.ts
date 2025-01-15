import { Router } from 'express'
import { monitorRoute } from '../middleware/monitoringWrapper.js';
import * as authController from '../controllers/authController.js'

const router = Router()

router.post('/signup',monitorRoute('user_signup'),  authController.signup)
router.post('/login',monitorRoute('user_login'),  authController.login)
router.get('/profile',monitorRoute('user_profile_fetch'),  authController.getProfile)
router.put('/profile',monitorRoute('user_profile_update'),  authController.updateProfile)
router.post('/send-otp',monitorRoute('otp_send'),  authController.sendOTP)
router.post('/verify-otp',monitorRoute('otp_verify'),  authController.verifyOTP)
router.get('/getAllUsers',monitorRoute('user_list'),  authController.getAllUsers)

//Messages
router.post('/messageSubmission',monitorRoute('message_create'),  authController.messageSubmission)
router.get('/getMessages',monitorRoute('message_list'),  authController.getMessages)
router.post('/replyMessage/:messageId',monitorRoute('message_reply_create'),  authController.replyMessage)

export { router as authRoutes }