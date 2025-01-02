import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes'
import { errorMiddleware } from './middleware/errorMiddleware'
import { metricsMiddleware, getMetrics } from './middleware/metricsMiddleware'
import { productRoutes } from './routes/productRoutes';
import { miscRoutes } from './routes/miscRoutes';
import { CRroutes } from './routes/comments&ReportsRoutes'
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet())
app.use(metricsMiddleware)


// Routes
app.use('/api/health', healthRoutes)
app.get('/metrics', getMetrics)
app.use('/api/products', productRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api', CRroutes);




// Error Handler
app.use(errorMiddleware)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app;