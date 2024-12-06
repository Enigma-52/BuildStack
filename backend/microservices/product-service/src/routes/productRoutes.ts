import { Router } from 'express'
import { createProduct , getProduct } from '../controllers/productController'
const router = Router()

router.post('/createProduct', createProduct)
router.get('/:name', getProduct)


export { router as productRoutes };

