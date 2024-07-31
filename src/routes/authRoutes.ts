import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddleware from '../infrastructure/middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *       example:
 *          email: "test5.com"
 *          password: "123456"
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        password:
 *          type: string
 *       example:
 *          email: "test5.com"
 *          username: "test5"
 *          password: "123456"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - AUTH
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Invalid credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     example:
 *       email: test5.com
 *       password: "123456"
 */

router.post('/login', authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - AUTH
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Invalid credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     example:
 *       email: "test5.com"
 *       username: "test5"
 *       password: "123456"
 */

router.post('/register', authController.register);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags:
 *       - AUTH
 *     responses:
 *       '200':
 *         description: OK
 *       '401':
 *         description: Token not provided
 *     security:
 *      - cookieAuth: []
 */
router.post('/logout', authMiddleware, authController.logout);

router.post('/loginWithGoogle', authController.googleAuth);
export default router;
