import User from '../domain/entities/User';
import prisma from '../infrastructure/database/prismaClient';
import PrismaUserRepository from '../infrastructure/repositories/PrismaUserRepository';
import jwt from 'jsonwebtoken';
import envs from '../config/env';
import bcrypt from 'bcrypt';

const userRepository = new PrismaUserRepository(prisma);

// const jwtSecret = process.env.JWT_SECRET;
class AuthService {
  private generateToken(user: User): string {
    if (!envs.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      envs.jwtSecret,
      { expiresIn: '1h' }
    );
  }

  async register(
    email: string,
    username: string,
    password: string
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      username,
      email,
      hashedPassword,
      new Date(),
      new Date()
    );

    await userRepository.createUser(user);
    return this.generateToken(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new Error('Invalid credentials');

    return this.generateToken(user);
  }
}
