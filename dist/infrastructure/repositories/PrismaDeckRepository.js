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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaDeckRepository = void 0;
class PrismaDeckRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    createDeck(deck) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultCreateDeck = yield this.prismaClient.deck.create({
                data: {
                    title: deck.title,
                    description: deck.description,
                    userId: deck.userId || '',
                    boxId: deck.boxId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            console.log(resultCreateDeck);
            return resultCreateDeck;
        });
    }
    getDecksByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultGetDecksByUserId = yield this.prismaClient.deck.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    flashCards: true,
                    boxes: {
                        select: {
                            boxName: true,
                        }
                    }
                },
            });
            return resultGetDecksByUserId;
        });
    }
    getDeckById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultGetDeckById = yield this.prismaClient.deck.findUnique({
                where: {
                    id: id,
                },
                include: {
                    flashCards: true,
                },
            });
            if (!resultGetDeckById) {
                throw new Error(`Deck with id ${id} not found`);
            }
            return resultGetDeckById;
        });
    }
    updateDeck(deck) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultUpdateDeck = yield this.prismaClient.deck.update({
                where: {
                    id: deck.id,
                },
                data: {
                    title: deck.title,
                    description: deck.description,
                    boxId: deck.boxId,
                    updatedAt: new Date(),
                },
            });
            return resultUpdateDeck;
        });
    }
    deleteDeck(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.deck.delete({
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.PrismaDeckRepository = PrismaDeckRepository;
//# sourceMappingURL=PrismaDeckRepository.js.map