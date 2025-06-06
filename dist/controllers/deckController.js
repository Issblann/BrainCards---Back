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
const deckService_1 = __importDefault(require("../services/deckService"));
class DeckController {
    createDeck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, boxId } = req.body;
            const { userId } = req.params;
            try {
                if (!title) {
                    res.status(400).json({ error: 'Title is required' });
                    return;
                }
                if (!userId) {
                    res.status(400).json({ error: 'User ID is required' });
                    return;
                }
                const deck = {
                    title,
                    description,
                    userId,
                    boxId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const newDeck = yield deckService_1.default.createDeck(deck);
                res.json(newDeck);
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred creating the deck';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    getDecksByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const decks = yield deckService_1.default.getDecksByUserId(userId);
                res.json(decks);
            }
            catch (error) {
                res.status(500).json({
                    error: 'An unknown error occurred getting the decks by userId',
                });
            }
        });
    }
    getDeckById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deck = yield deckService_1.default.getDeckById(id);
                res.json(deck);
            }
            catch (error) {
                res.status(500).json({
                    error: 'An unknown error occurred getting the deck by id',
                });
                throw error;
            }
        });
    }
    updateDeck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description, boxId } = req.body;
            try {
                if (!id) {
                    res.status(400).json({ error: 'Deck ID is required' });
                    return;
                }
                // Fetch the existing deck to get userId and createdAt
                const existingDeck = yield deckService_1.default.getDeckById(id);
                if (!existingDeck) {
                    res.status(404).json({ error: 'Deck not found' });
                    return;
                }
                const deck = {
                    id,
                    title,
                    description,
                    boxId,
                    userId: existingDeck.userId,
                    createdAt: existingDeck.createdAt,
                    updatedAt: new Date(),
                };
                const updatedDeck = yield deckService_1.default.updateDeck(deck);
                res.json(updatedDeck);
            }
            catch (error) {
                res.status(500).json({
                    error: 'An unknown error occurred updating the deck',
                });
            }
        });
    }
    deleteDeck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    res.status(400).json({ error: 'Deck ID is required' });
                    return;
                }
                yield deckService_1.default.deleteDeck(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({
                    error: 'An unknown error occurred deleting the deck',
                });
            }
        });
    }
}
exports.default = new DeckController();
//# sourceMappingURL=deckController.js.map