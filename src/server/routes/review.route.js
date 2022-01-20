import { Router } from 'express';
import * as ReviewController from '../controllers/review.controller.js';

const router = Router();

router.get('/', ReviewController.getReviews);
router.get('/:id', ReviewController.getReview);

router.post('/', ReviewController.createReview);

router.delete('/:id', ReviewController.deleteReview);

export default router;

