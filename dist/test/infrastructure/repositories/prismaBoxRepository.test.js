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
const PrismaBoxRepository_1 = require("../../../infrastructure/repositories/PrismaBoxRepository");
describe('PrismaBoxRepository', () => {
    let prismaMock;
    let boxRepository;
    beforeEach(() => {
        prismaMock = {
            box: {
                findFirst: jest.fn(),
                create: jest.fn(),
            },
        };
        boxRepository = new PrismaBoxRepository_1.PrismaBoxRepository(prismaMock);
    });
    it('debe retornar la caja existente si ya existe', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockBox = { boxName: 'Favoritos', userId: '123', createdAt: new Date(), updatedAt: new Date(), decks: [] };
        prismaMock.box.findFirst.mockResolvedValue(mockBox);
        const result = yield boxRepository.createBox(mockBox);
        expect(prismaMock.box.findFirst).toHaveBeenCalledWith({
            where: {
                boxName: mockBox.boxName,
                userId: mockBox.userId,
            },
            include: { decks: true },
        });
        expect(result).toEqual(mockBox);
        expect(prismaMock.box.create).not.toHaveBeenCalled();
    }));
    it('debe crear una nueva caja si no existe', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputBox = { boxName: 'Nueva Caja', userId: '456' };
        const createdBox = Object.assign(Object.assign({}, inputBox), { id: '789', decks: [], createdAt: new Date(), updatedAt: new Date() });
        prismaMock.box.findFirst.mockResolvedValue(null);
        prismaMock.box.create.mockResolvedValue(createdBox);
        const result = yield boxRepository.createBox(createdBox);
        expect(prismaMock.box.findFirst).toHaveBeenCalled();
        expect(prismaMock.box.create).toHaveBeenCalledWith({
            data: expect.objectContaining({
                boxName: inputBox.boxName,
                userId: inputBox.userId,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }),
        });
        expect(result).toEqual(createdBox);
    }));
});
//# sourceMappingURL=prismaBoxRepository.test.js.map