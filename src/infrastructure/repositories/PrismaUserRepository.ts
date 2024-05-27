import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import User from '../../domain/entities/User';

class PrismaUserRepository implements IUserRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({ where: { email } });

    if (!user) return null;

    return new User(
      user.username,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }

  async createUser(user: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }
}

export default PrismaUserRepository;
