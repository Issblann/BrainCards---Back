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
exports.PrismaBoxRepository = void 0;
class PrismaBoxRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    createBox(box) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingBox = yield this.prismaClient.box.findFirst({
                where: {
                    boxName: box.boxName,
                    userId: box.userId,
                },
                include: {
                    decks: true,
                },
            });
            if (existingBox)
                return existingBox;
            const boxToCreate = {
                boxName: box.boxName,
                userId: box.userId || '',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newBox = yield this.prismaClient.box.create({ data: boxToCreate });
            return newBox;
        });
    }
    getBoxesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultGetBoxesByUserId = yield this.prismaClient.box.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    decks: true,
                },
            });
            return resultGetBoxesByUserId;
        });
    }
    getBoxById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const box = yield this.prismaClient.box.findUnique({
                where: {
                    id,
                },
                include: {
                    decks: true,
                },
            });
            return box;
        });
    }
    updateBox(id, boxData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBox = yield this.prismaClient.box.update({
                where: {
                    id,
                },
                data: {
                    boxName: boxData.boxName,
                    updatedAt: new Date(),
                },
                include: {
                    decks: true,
                },
            });
            return updatedBox;
        });
    }
    deleteBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.box.delete({
                where: {
                    id,
                },
            });
        });
    }
}
exports.PrismaBoxRepository = PrismaBoxRepository;
//# sourceMappingURL=PrismaBoxRepository.js.map