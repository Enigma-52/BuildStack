import { Router } from 'express'
import { subscribe , sendWeeklyNewsletter } from '../controllers/newsletterController.js'
import { monitorRoute } from '../middleware/monitoringWrapper.js';

const router = Router()

router.post('/subscribe',monitorRoute('newsletter_subscribe'),  subscribe)
router.get('/executeNewsletter',monitorRoute('newsletter_execute'),  sendWeeklyNewsletter)

export { router as miscRoutes };

