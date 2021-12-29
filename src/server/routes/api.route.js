import { Router } from 'express';
import UserRouter from './user.route.js';
import ReviewRouter from './review.route.js';


export default database => {
	const router = Router();

	router.use('/user/', UserRouter(database));

	router.use('/review/', ReviewRouter(database));

	return router;
};
