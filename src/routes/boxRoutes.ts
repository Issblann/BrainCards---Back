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
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the user.
 *              lastName:
 *                type: string
 *                description: The last name of the user (optional).
 *              bio:
 *                type: string
 *                description: A short bio or description of the user (optional).
 *              image:
 *                type: string
 *                format: uri
 *                description: URL of the profile image (optional).
 *            example:
 *              boxName: "History"
 *     responses:
 *       '201':
 *         description: Successfully retrieved the user boxes.
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
