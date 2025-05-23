import { PrismaBoxRepository } from '../../../infrastructure/repositories/PrismaBoxRepository';
import { PrismaClient } from '@prisma/client';

describe('PrismaBoxRepository', () => {
  let prismaMock: any;
  let boxRepository: PrismaBoxRepository;

  beforeEach(() => {
    prismaMock = {
      box: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };

    boxRepository = new PrismaBoxRepository(prismaMock as unknown as PrismaClient);
  });

  it('debe retornar la caja existente si ya existe', async () => {
    const mockBox = { boxName: 'Favoritos', userId: '123', createdAt: new Date(), updatedAt: new Date(), decks: [] };
    prismaMock.box.findFirst.mockResolvedValue(mockBox);

    const result = await boxRepository.createBox(mockBox);

    expect(prismaMock.box.findFirst).toHaveBeenCalledWith({
      where: {
        boxName: mockBox.boxName,
        userId: mockBox.userId,
      },
      include: { decks: true },
    });
    expect(result).toEqual(mockBox);
    expect(prismaMock.box.create).not.toHaveBeenCalled();
  });

  it('debe crear una nueva caja si no existe', async () => {
    const inputBox = { boxName: 'Nueva Caja', userId: '456' };
    const createdBox = {
      ...inputBox,
      id: '789',
      decks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.box.findFirst.mockResolvedValue(null);
    prismaMock.box.create.mockResolvedValue(createdBox);

    const result = await boxRepository.createBox(createdBox);

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
  });
});
