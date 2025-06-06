"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../infrastructure/middleware/authMiddleware"));
const flashCardController_1 = __importDefault(require("../controllers/flashCardController"));
const router = (0, express_1.Router)();
router.post('/createFlashCards/:deckId', authMiddleware_1.default, flashCardController_1.default.createFlashCards);
router.get('/getFlashcardsByDeckId/:deckId', authMiddleware_1.default, flashCardController_1.default.getFlashCardsByDeckId);
router.delete('/deleteFlashCard/:id', authMiddleware_1.default, flashCardController_1.default.deleteFlashCardById);
exports.default = router;
//# sourceMappingURL=flashCardRoutes.js.map