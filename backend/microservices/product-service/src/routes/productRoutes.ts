import { Router } from 'express'
import { createProduct , getProduct , getAllProducts , approveProduct , getProductByCategory , upvoteProduct} from '../controllers/productController'
const router = Router()

router.post('/createProduct', createProduct)
router.get('/:name', getProduct)
router.get('/getAllProducts/all', getAllProducts)
router.patch('/approve/:productId', approveProduct)
router.get('/category/:categoryName', getProductByCategory)
router.post('/upvote/:productId', upvoteProduct);

export { router as productRoutes };

