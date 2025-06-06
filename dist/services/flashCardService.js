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
const prismaClient_1 = __importDefault(require("../infrastructure/database/prismaClient"));
const PrismaFlashCardRepository_1 = require("../infrastructure/repositories/PrismaFlashCardRepository");
const flashCardRepository = new PrismaFlashCardRepository_1.PrismaFlashCardRepository(prismaClient_1.default);
class FlashCardService {
    createFlashCards(flashCardRequest, deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield flashCardRepository.createFlashCards(flashCardRequest, deckId);
        });
    }
    getFlashCardsByDeckId(deckId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield flashCardRepository.getFlashCardsByDeckId(deckId);
        });
    }
    deleteFlashCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield flashCardRepository.deleteFlashCardById(id);
        });
    }
}
exports.default = new FlashCardService();
//# sourceMappingURL=flashCardService.js.map