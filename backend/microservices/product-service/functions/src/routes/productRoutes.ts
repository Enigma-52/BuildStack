import { Router } from 'express'
import { createProduct , getProduct , getAllProducts , approveProduct , getProductByCategory , upvoteProduct} from '../controllers/productController.js'
const router = Router()
import { monitorRoute } from '../middleware/monitoringWrapper.js';

router.post('/createProduct',monitorRoute('product_create'), createProduct)
router.get('/:name', monitorRoute('product_fetch'), getProduct)
router.get('/getAllProducts/all', monitorRoute('product_list'), getAllProducts)
router.patch('/approve/:productId', monitorRoute('product_approval'), approveProduct)
router.get('/category/:categoryName', monitorRoute('category_fetch'), getProductByCategory)
router.post('/upvote/:productId', monitorRoute('product_upvote'), upvoteProduct);

export { router as productRoutes };

