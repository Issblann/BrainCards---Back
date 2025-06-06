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
const PrismaBoxRepository_1 = require("../infrastructure/repositories/PrismaBoxRepository");
const prismaClient_1 = __importDefault(require("../infrastructure/database/prismaClient"));
const boxRepository = new PrismaBoxRepository_1.PrismaBoxRepository(prismaClient_1.default);
class BoxService {
    createBox(box) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield boxRepository.createBox(box);
        });
    }
    getBoxesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield boxRepository.getBoxesByUserId(userId);
        });
    }
    getBoxById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield boxRepository.getBoxById(id);
        });
    }
    updateBox(id, boxData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield boxRepository.updateBox(id, boxData);
        });
    }
    deleteBox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield boxRepository.deleteBox(id);
        });
    }
}
exports.default = new BoxService();
//# sourceMappingURL=boxService.js.map