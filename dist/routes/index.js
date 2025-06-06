"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const profileRoutes_1 = __importDefault(require("./profileRoutes"));
const deckRoutes_1 = __importDefault(require("./deckRoutes"));
const flashCardRoutes_1 = __importDefault(require("./flashCardRoutes"));
const boxRoutes_1 = __importDefault(require("./boxRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', authRoutes_1.default);
router.use('/api', profileRoutes_1.default);
router.use('/api/boxes', boxRoutes_1.default);
router.use('/api/decks', deckRoutes_1.default);
router.use('/api/flashcards', flashCardRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map