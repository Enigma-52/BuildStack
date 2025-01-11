import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { metricsMiddleware, getMetrics } from './middleware/metricsMiddleware.js'
import { productRoutes } from './routes/productRoutes.js';
import { miscRoutes } from './routes/miscRoutes.js';
import { CRroutes } from './routes/comments&ReportsRoutes.js'
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
app.use('/api/health', healthRoutes)
app.get('/metrics', getMetrics)
app.use('/api/products', productRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api', CRroutes);

// Error Handler
app.use(errorMiddleware)

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})

export default app;