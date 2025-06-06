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
const boxService_1 = __importDefault(require("../services/boxService"));
class BoxController {
    createBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { boxName } = req.body;
            const { userId } = req.params;
            try {
                if (!boxName) {
                    return res.status(400).json({ error: 'Box name is required' });
                }
                if (!userId) {
                    return res.status(400).json({ error: 'User id is required' });
                }
                const box = {
                    boxName,
                    userId,
                    decks: [],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                const newBox = yield boxService_1.default.createBox(box);
                return res.status(201).json(newBox);
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
    getBoxesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                if (!userId) {
                    return res.status(400).json({ error: 'User id is required' });
                }
                const boxes = yield boxService_1.default.getBoxesByUserId(userId);
                return res.status(200).json(boxes);
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
    getBoxById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    return res.status(400).json({ error: 'Box id is required' });
                }
                const box = yield boxService_1.default.getBoxById(id);
                if (!box) {
                    return res.status(404).json({ error: 'Box not found' });
                }
                return res.status(200).json(box);
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
    updateBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const boxData = req.body;
            try {
                if (!id) {
                    return res.status(400).json({ error: 'Box id is required' });
                }
                const updatedBox = yield boxService_1.default.updateBox(id, boxData);
                if (!updatedBox) {
                    return res.status(404).json({ error: 'Box not found' });
                }
                return res.status(200).json(updatedBox);
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
    deleteBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    return res.status(400).json({ error: 'Box id is required' });
                }
                yield boxService_1.default.deleteBox(id);
                return res.status(200).send({ message: 'Box deleted successfully' });
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
exports.default = new BoxController();
//# sourceMappingURL=boxController.js.map