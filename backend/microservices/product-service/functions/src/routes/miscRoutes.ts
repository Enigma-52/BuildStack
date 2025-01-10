import { Router } from 'express'
import { subscribe , sendWeeklyNewsletter } from '../controllers/newsletterController.js'
const router = Router()

router.post('/subscribe', subscribe)
router.get('/executeNewsletter', sendWeeklyNewsletter)

export { router as miscRoutes };

