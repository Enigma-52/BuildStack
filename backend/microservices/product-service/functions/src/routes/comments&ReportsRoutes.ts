import { Router } from 'express';
import * as CRController from '../controllers/CRController.js';
import { monitorRoute } from '../middleware/monitoringWrapper.js';

const router = Router()

// Comment Routes
router.get('/products/:productId/comments',monitorRoute('comments_per_product_fetch'), CRController.getComments);
router.post('/products/:productId/comments',monitorRoute('comments_per_product_create'),  CRController.createComment);
router.post('/comments/:commentId/replies',monitorRoute('replies_per_comment_create'),  CRController.createReply);
router.post('/comments/:commentId/like',monitorRoute('comment_like_create'),  CRController.toggleLike);

// Report Routes
router.get('/reports',monitorRoute('reports_fetch'),  CRController.getReports);
router.get('/reports/:reportId',monitorRoute('report_per_product_fetch'),  CRController.getReportDetails);
router.put('/reports/:reportId',monitorRoute('report_per_product_update'),  CRController.updateReport);

export { router as CRroutes };