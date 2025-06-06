"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../infrastructure/middleware/authMiddleware"));
const profileController_1 = __importDefault(require("../controllers/profileController"));
const router = (0, express_1.Router)();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: storage });
/**
 * @swagger
 * components:
 *   schemas:
 *     GetProfileResponse:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *        name:
 *          type: string
 *        lastName:
 *          type: string
 *        bio:
 *          type: string
 *        image:
 *          type: string
 *          format: uri
 *       example:
 *          userId: "clz7kegv50000qpjcxq7f28gq"
 *          name: "John"
 *          lastName: "Doe"
 *          bio: "Software Developer"
 *          image: "https://example.com/profile.jpg"
 */
/**
 * @swagger
 * /api/profile/{userId}:
 *   get:
 *     summary: Get user profile
 *     tags:
 *       - PROFILE
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose profile you want to retrieve.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the user profile.
 *       '400':
 *         description: Bad request, e.g., invalid `userId` format.
 *       '404':
 *         description: User not found.
 */
router.get('/profile/:userId', authMiddleware_1.default, profileController_1.default.getProfile);
/**
 * @swagger
 * /api/profile/{userId}:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - PROFILE
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose profile you want to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user (optional).
 *               bio:
 *                 type: string
 *                 description: A short bio or description of the user (optional).
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: URL of the profile image (optional).
 *             example:
 *               name: "John"
 *               lastName: "Doe"
 *               bio: "Software Developer"
 *               image: "https://example.com/profile.jpg"
 *     responses:
 *       '200':
 *         description: Successfully updated the user profile.
 *       '400':
 *         description: Bad request, e.g., invalid input format.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
router.put('/profile/:id', authMiddleware_1.default, upload.single('image'), profileController_1.default.updateProfile);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map