import { Router } from 'express'
import { createProduct } from '../controllers/productController'
const router = Router()

router.post('/createProduct', createProduct)

export { router as productRoutes };

