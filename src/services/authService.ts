import { User } from '../domain/entities/User';
import prisma from '../infrastructure/database/prismaClient';
import PrismaUserRepository from '../infrastructure/repositories/PrismaUserRepository';
import jwt from 'jsonwebtoken';
import envs from '../config/env';
import bcrypt from 'bcrypt';
import PrismaProfileRepository from '../infrastructure/repositories/PrismaProfileRepository';
import { Profile } from '../domain/entities/Profile';
import boxService from './boxService';

const userRepository = new PrismaUserRepository(prisma);
const profileRepository = new PrismaProfileRepository(prisma);
class AuthService {
  generateToken(user: User): string {
    if (!envs.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(tokenPayload, envs.jwtSecret);
    return token;
  }

  async register(
    email: string,
    username: string,
    password?: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password || '', 10);
    if (
      (await userRepository.findUserByEmail(email)) ||
      (await userRepository.findUserByUsername(username))
    )
      throw new Error('User already exists');

    const user = new User(username, email, hashedPassword, new Date());
    const createdUser = await userRepository.createUser(user);

    const profile = new Profile(
      createdUser.id || '',
      createdUser.username,
      '',
      '',
      '',
      new Date()
    );
    await profileRepository.createProfile(profile);

    const box = {
      boxName: 'All',
      userId: createdUser.id,
      decks: [
        {
          userId: createdUser.id,
          title: 'Example Deck',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await boxService.createBox(box);
    return createdUser;
  }

  async login(email: string, password?: string): Promise<User> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password || '', user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');
    if (!envs.jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    let profile = await profileRepository.getProfileByUserId(user.id);
    if (!profile) {
      profile = new Profile(user.id, user.username, '', '', '', new Date());
      await profileRepository.createProfile(profile);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await userRepository.findUserByEmail(email);
  }
}

export default new AuthService();
