import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import UserRouter from './user.route.js';
import ReviewRouter from './review.route.js';

const swaggerDefinition  = {
	openapi: '3.0.0',
	info: {
		title: 'COMP1101 Summative 1 API Documentation',
		version: '1.0.0',
	},
	servers: [
		{
			url: process.env.API_BASE_URL,
			description: 'Production Server'
		}
	]
};
const spec = swaggerJSDoc({
	swaggerDefinition,
	apis: ['./src/server/routes/*.js']
});

const router = Router();

router.use('/user/', UserRouter);

router.use('/review/', ReviewRouter);

router.use('/docs/', swaggerUi.serve, swaggerUi.setup(spec));

export default router;
