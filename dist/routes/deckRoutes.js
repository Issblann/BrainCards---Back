"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../infrastructure/middleware/authMiddleware"));
const deckController_1 = __importDefault(require("../controllers/deckController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     GetDecksResponse:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *        userId:
 *          type: string
 *        boxId:
 *          type: string
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        flashcards:
 *          type: array
 *       example:
 *          userId: "clz7kegv50000qpjcxq7f28gq"
 *          boxId: "clz8oumzs0001df3tyf57c045"
 *          title: "Deck 1"
 *          description: "Deck 1 description"
 *          flashcards: []
 */
/**
 * @swagger
 * /api/decks/createDeck/{userId}:
 *   post:
 *     summary: Create a deck for an user
 *     tags:
 *       - DECKS
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose decks you want to retrieve.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                description: The title of a deck.
 *              description:
 *                type: string
 *                description: Description of a deck (optional).
 *              boxId:
 *                type: string
 *                description: Box Id.
 *            example:
 *              title: "Biology deck 2"
 *              description: "Biology deck 2 description"
 *              boxId: "clz7lxmde000aqpjcz2auv77a"
 *     responses:
 *       '201':
 *         description: Successfully creating the user deck.
 *       '400':
 *         description: Bad request, e.g., invalid `userId` or `deck` format.
 *       '404':
 *         description: User or deck not found.
 */
router.post('/createDeck/:userId', authMiddleware_1.default, deckController_1.default.createDeck);
/**
 * @swagger
 * /api/decks/getDecksByUserId/{userId}:
 *   get:
 *     summary: Get user decks
 *     tags:
 *       - DECKS
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
 *         description: Bad request, e.g., invalid `userId` or `deck` format.
 *       '404':
 *         description: User or deck not found.
 */
router.get('/getDecksByUserId/:userId', authMiddleware_1.default, deckController_1.default.getDecksByUserId);
router.get('/getDeckById/:id', authMiddleware_1.default, deckController_1.default.getDeckById);
router.put('/updateDeck/:id', authMiddleware_1.default, deckController_1.default.updateDeck);
router.delete('/deleteDeck/:id', authMiddleware_1.default, deckController_1.default.deleteDeck);
exports.default = router;
//# sourceMappingURL=deckRoutes.js.map