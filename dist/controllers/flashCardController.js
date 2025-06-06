"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flashCardService_1 = __importDefault(require("../services/flashCardService"));
const FlashCard_1 = require("../domain/entities/FlashCard");
class FlashCardController {
    createFlashCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, description, quantityFlashcards, difficultyLevel } = req.body;
            const { deckId } = req.params;
            try {
                if (!topic) {
                    res.status(400).json({ error: 'Topic is required' });
                    return;
                }
                if (!quantityFlashcards ||
                    !Number.isInteger(quantityFlashcards) ||
                    quantityFlashcards <= 0) {
                    res.status(400).json({
                        error: 'The quantity of the flashcards is required and must be a positive integer',
                    });
                    return;
                }
                if (!difficultyLevel ||
                    !Object.values(FlashCard_1.EnumDifficultyLevel).includes(difficultyLevel)) {
                    res.status(400).json({
                        error: 'Difficulty level is required and must be one of Easy, Medium, Hard',
                    });
                    return;
                }
                const flashCardRequest = {
                    topic,
                    description,
                    quantityFlashcards,
                    difficultyLevel,
                };
                const newFlashCards = yield flashCardService_1.default.createFlashCards(flashCardRequest, deckId);
                return res.status(201).json(newFlashCards);
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    getFlashCardsByDeckId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deckId } = req.params;
            try {
                if (!deckId) {
                    res.status(400).json({ error: 'Deck ID is required' });
                    return;
                }
                const flashCards = yield flashCardService_1.default.getFlashCardsByDeckId(deckId);
                return res.status(200).json(flashCards);
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    deleteFlashCardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    res.status(400).json({ error: 'FlashCard ID is required' });
                    return;
                }
                yield flashCardService_1.default.deleteFlashCardById(id);
                return res.status(200).json({ message: 'FlashCard deleted successfully' });
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
}
exports.default = new FlashCardController();
//# sourceMappingURL=flashCardController.js.map