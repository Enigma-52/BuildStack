import { Router } from 'express'
import { checkHealth } from '../controllers/healthController.js'
import { monitorRoute } from '../middleware/monitoringWrapper.js';

const router = Router()

router.get('/',monitorRoute('health_check'), checkHealth)

export { router as healthRoutes }

