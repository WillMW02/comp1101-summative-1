import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

export default database => {
	const controller = UserController(database);
	const router = Router();

	router.get('/', controller.getUsers);
	router.get('/:id', controller.getUser);

	router.post('/', controller.createUser);

	router.delete('/:id', controller.deleteUser);

	return router;
};
