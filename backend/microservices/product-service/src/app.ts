import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes'
import { errorMiddleware } from './middleware/errorMiddleware'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

// Routes
app.use('/api/health', healthRoutes)

// Error Handler
app.use(errorMiddleware)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})