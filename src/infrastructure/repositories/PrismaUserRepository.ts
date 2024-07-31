import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

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
      user.id
    );
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    return new User(
      user.username,
      user.email,
      user.password,
      user.createdAt,
      user.id
    );
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });

    if (!user) return null;

    return new User(
      user.username,
      user.email,
      user.password,
      user.createdAt,
      user.id
    );
  }

  async createUser(user: User): Promise<User> {
    return await this.prismaClient.user.create({ data: user });
  }
}

export default PrismaUserRepository;
