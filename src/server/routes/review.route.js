import { Router } from 'express';
import ReviewController from '../controllers/review.controller.js';

export default database => {
	const controller = ReviewController(database);
	const router = Router();

	router.get('/', controller.getReviews);
	router.get('/:id', controller.getReview);

	router.post('/', controller.createReview);

	router.delete('/:id', controller.deleteReview);

	return router;
};

