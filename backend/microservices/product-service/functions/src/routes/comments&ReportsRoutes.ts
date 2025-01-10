import { Router } from 'express';
import * as CRController from '../controllers/CRController.js';

const router = Router()

// Comment Routes
router.get('/products/:productId/comments', CRController.getComments);
router.post('/products/:productId/comments', CRController.createComment);
router.post('/comments/:commentId/replies', CRController.createReply);
router.post('/comments/:commentId/like', CRController.toggleLike);

// Report Routes
router.get('/reports', CRController.getReports);
router.get('/reports/:reportId', CRController.getReportDetails);
router.put('/reports/:reportId', CRController.updateReport);

export { router as CRroutes };