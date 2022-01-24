import { Router } from 'express';
import * as ReviewController from '../controllers/review.controller.js';

const router = Router();

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Retrieve all reviews
 *     tags: 
 *       - reviews
 *     responses:
 *       200:
 *         description: A list of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/', ReviewController.getReviews);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Retrieve a single review specified by ID
 *     tags: 
 *       - reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Unique Identifier of the review to be retrieved
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: A single review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: No review matching the provided ID could be found
 */
router.get('/:id', ReviewController.getReview);

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Create a review
 *     tags: 
 *       - reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The unique identifier of the user posting the review
 *                 example: 10
 *               title:
 *                 type: string
 *                 description: The title of the review to be created
 *                 example: Mediocre Service
 *               content:
 *                 type: string
 *                 description: The description of the review
 *                 example: Experience was sub par, nothing special.
 *               rating:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 5
 *                 description: the rating (in stars) between one and five
 *                 example: 3
 *     responses:
 *       201:
 *         description: Review Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: the ID of the created review
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
 *                   example: No Such User
 *                 
 */
router.post('/', ReviewController.createReview);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Delete a single review specified by ID
 *     tags: 
 *       - reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The Unique Identifier of the review to be deleted
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       202:
 *         description: Successful deletion
 *               
 *       404:
 *         description: Review not found
 */
router.delete('/:id', ReviewController.deleteReview);

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: A unique identifier for the review
 *           example: 9 
 *         title:
 *           type: string
 *           description: The title of the review
 *           example: Great Experience
 *         content:
 *           type: string
 *           description: The review content
 *           example: Friendly staff, overall good experience
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of review being posted
 *         name:
 *           type: string
 *           description: The name of the reviewer
 *           example: William Maltby-Wehner
 *         avatar:
 *           type: string
 *           description: The B64 encoded avatar of the user
 *           example: QmlnIHVwIHN0ZXZlbiBicmFkbGV5
 */

export default router;

