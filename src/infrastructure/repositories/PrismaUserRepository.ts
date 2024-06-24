import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AuthenticatedUser, User } from '../../domain/entities/User';

class PrismaUserRepository implements IUserRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async findUserByEmail(email: string): Promise<AuthenticatedUser | null> {
    const user = await this.prismaClient.user.findUnique({ where: { email } });

    if (!user) return null;

    return new AuthenticatedUser(
      user.id,
      user.username,
      user.email,
      user.password,
      user.createdAt
    );
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    return new User(user.username, user.email, user.password, user.createdAt);
  }

  async findUserById(id: string): Promise<AuthenticatedUser | null> {
    const user = await this.prismaClient.user.findUnique({ where: { id } });

    if (!user) return null;

    return new AuthenticatedUser(
      user.id,
      user.username,
      user.email,
      user.password,
      user.createdAt
    );
  }

  async createUser(user: User): Promise<void> {
    await this.prismaClient.user.create({ data: user });
  }
}

export default PrismaUserRepository;
