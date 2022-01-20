import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);

router.post('/', UserController.createUser);

router.delete('/:id', UserController.deleteUser);

export default router;
