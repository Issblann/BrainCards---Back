import { Router } from 'express';
import authMiddleware from '../infrastructure/middleware/authMiddleware';
import boxController from '../controllers/boxController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GetBoxesResponse:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *        boxName:
 *          type: string
 *        decks:
 *          type: array
 *        userId:
 *          type: string
 *       example:
 *          userId: "clz7kegv50000qpjcxq7f28gq"
 *          boxName: "All"
 *          decks: []
 */

/**
 * @swagger
 * /api/boxes/createBox/{userId}:
 *   post:
 *     summary: Create a box for a user
 *     tags:
 *       - BOXES
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose boxes you want to retrieve.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - boxName
 *            properties:
 *              boxName:
 *                type: string
 *                description: The boxName of the box.
 *            example:
 *              boxName: "History"
 *     responses:
 *       '201':
 *         description: Successfully creating the user boxes.
 *       '400':
 *         description: Bad request, e.g., invalid `userId` format.
 *       '404':
 *         description: User not found.
 */

router.post('/createBox/:userId', authMiddleware, boxController.createBox);

/**
 * @swagger
 * /api/boxes/getBoxesByUserId/{userId}:
 *   get:
 *     summary: Get user boxes
 *     tags:
 *       - BOXES
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose boxes you want to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user boxes.
 *       '400':
 *         description: Bad request, e.g., invalid `userId` format.
 *       '404':
 *         description: User not found.
 */
router.get(
  '/getBoxesByUserId/:userId',
  authMiddleware,
  boxController.getBoxesByUserId
);
export default router;
