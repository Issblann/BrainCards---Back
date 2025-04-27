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

/**
 * @swagger
 * /api/boxes/getBoxById/{id}:
 *   get:
 *     summary: Get a box by ID
 *     tags:
 *       - BOXES
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the box to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the box.
 *       '400':
 *         description: Bad request, e.g., invalid `id` format.
 *       '404':
 *         description: Box not found.
 */
router.get('/getBoxById/:id', authMiddleware, boxController.getBoxById);

/**
 * @swagger
 * /api/boxes/updateBox/{id}:
 *   put:
 *     summary: Update a box by ID
 *     tags:
 *       - BOXES
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the box to update.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              boxName:
 *                type: string
 *                description: The new boxName of the box.
 *            example:
 *              boxName: "History"
 *     responses:
 *       '200':
 *         description: Successfully updated the box.
 *       '400':
 *         description: Bad request, e.g., invalid `id` format.
 */
router.put('/updateBox/:id', authMiddleware, boxController.updateBox);

/**
 * @swagger
 * /api/boxes/deleteBox/{id}:
 *   delete:
 *     summary: Delete a box by ID
 *     tags:
 *       - BOXES
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the box to delete.
 *     responses:
 *       '200':
 *         description: Successfully deleted the box.
 *       '400':
 *         description: Bad request, e.g., invalid `id` format.
 */
router.delete('/deleteBox/:id', authMiddleware, boxController.deleteBox);
export default router;
