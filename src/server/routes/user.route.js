import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user specified by ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Unique Identifier of the user to be retrieved
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No user matching the provided ID could be found
 */
router.get('/:id', UserController.getUser);

/**
 * @swagger
 * /user/name/{name}:
 *   get:
 *     summary: Retrieve a single user specified by name
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The Unique name of the user to be retrieved
 *         schema:
 *           type: string
 *           example: Andrei Krokhin
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: No user matching the provided name could be found
 */
router.get('/name/:name', UserController.getUserByName);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user to be created
 *                 example: Andrei Krokhin
 *               avatar:
 *                 type: string
 *                 description: The link to the avatar of the user
 *                 example: https://andrei.krokh.in/andrei.jpg
 *     responses:
 *       201:
 *         description: User Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: the ID of the created user
 *                   example: 1
 *       406:
 *         description: Request Body did not pass validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: Error message explaining invalid data
 *                   example: Request body did not include required parameters
 *       409:
 *         description: User already exists by that name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: Error message explaining invalid data
 *                   example: User Already Exists
 *      
 */
router.post('/', UserController.createUser);

/**
 * @swagger
 * /user/{id}/avatar:
 *   post:
 *     summary: Set a user avatar
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Unique Identifier of the user to be changed
 *         schema:
 *           type: integer
 *           example: 0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 description: The link to the avatar of the user
 *                 example: https://andrei.krokh.in/andrei.jpg
 *     responses:
 *       202:
 *         description: Avatar updated
 *       404:
 *         description: User could not be found by specified ID
 */
router.post('/:id/avatar', UserController.setAvatar);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a single user specified by ID
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Unique Identifier of the user to be deleted
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       202:
 *         description: Successful deletion
 *       404:
 *         description: User not found
 */
router.delete('/:id', UserController.deleteUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: A unique identifier for the user
 *           example: 9
 *         name:
 *           type: string
 *           description: The name of the reviewer
 *           example: Andrei Krokhin
 *         avatar:
 *           type: string
 *           description: The link to the avatar of the user
 *           example: https://andrei.krokh.in/andrei.jpg
 */

export default router;
