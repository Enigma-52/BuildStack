import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:5173',"https://buildstack-rho.vercel.app"],
    credentials: true
  }));
app.use(helmet())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/health', healthRoutes)

// Error Handler
app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

export default app;