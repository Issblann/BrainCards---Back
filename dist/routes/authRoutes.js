"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../infrastructure/middleware/authMiddleware"));
const router = (0, express_1.Router)();
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
 *          email: "test5@gmail.com"
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
 *          email: "test4@gmail.com"
 *          username: "test4"
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
router.post('/login', authController_1.default.login);
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
router.post('/register', authController_1.default.register);
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
router.post('/logout', authMiddleware_1.default, authController_1.default.logout);
router.post('/loginWithGoogle', authController_1.default.googleAuth);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map