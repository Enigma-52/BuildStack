import { Router } from 'express'
import { createProduct , getProduct , getAllProducts , approveProduct} from '../controllers/productController'
const router = Router()

router.post('/createProduct', createProduct)
router.get('/:name', getProduct)
router.get('/getAllProducts/all', getAllProducts)
router.patch('/approve/:productId', approveProduct)


export { router as productRoutes };

