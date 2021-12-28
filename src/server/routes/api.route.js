import { Router } from 'express';
import UserRouter from './user.route.js';
import ReviewRouter from './review.route.js';


const router = Router();

router.use('/user/', UserRouter);

router.use('/review', ReviewRouter);

export default router;
