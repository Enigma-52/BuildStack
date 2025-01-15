import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { metricsMiddleware } from './middleware/metricsMiddleware.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173',"https://buildstack-rho.vercel.app"],
    credentials: true
  }));
app.use(helmet())
app.use(metricsMiddleware)


// Routes
app.use('/api/auth', authRoutes)
app.use('/api/health', healthRoutes)

// Error Handler
app.use(errorMiddleware)

export default app;