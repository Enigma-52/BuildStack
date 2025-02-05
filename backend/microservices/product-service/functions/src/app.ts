import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { healthRoutes } from './routes/healthRoutes.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { productRoutes } from './routes/productRoutes.js';
import { miscRoutes } from './routes/miscRoutes.js';
import { CRroutes } from './routes/comments&ReportsRoutes.js';
import { initRedis } from './config/redisClient.js';

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
app.use('/api/health', healthRoutes)
app.use('/api/products', productRoutes);
app.use('/api/misc', miscRoutes);
app.use('/api', CRroutes);

// Error Handler
app.use(errorMiddleware)

initRedis();

app.listen(3001, () => {
  console.log('Server started on port 3001')
})

export default app;