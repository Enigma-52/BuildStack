import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { metricsMiddleware, getMetrics } from './middleware/metricsMiddleware.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(metricsMiddleware)


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/health', healthRoutes)
app.get('/metrics', getMetrics)

// Error Handler
app.use(errorMiddleware)

export default app;