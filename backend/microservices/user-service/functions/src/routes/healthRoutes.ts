import { Router } from 'express'
import { checkHealth } from '../controllers/healthController.js'

const router = Router()

router.get('/', checkHealth)

export { router as healthRoutes }

