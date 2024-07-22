import { AuthenticatedUser, User } from '../domain/entities/User';
import prisma from '../infrastructure/database/prismaClient';
import PrismaUserRepository from '../infrastructure/repositories/PrismaUserRepository';
import jwt from 'jsonwebtoken';
import envs from '../config/env';
import bcrypt from 'bcrypt';
import PrismaProfileRepository from '../infrastructure/repositories/PrismaProfileRepository';
import { Profile } from '../domain/entities/Profile';

const userRepository = new PrismaUserRepository(prisma);
const profileRepository = new PrismaProfileRepository(prisma);
class AuthService {
  generateToken(user: AuthenticatedUser): string {
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
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (
      (await userRepository.findUserByEmail(email)) ||
      (await userRepository.findUserByUsername(username))
    )
      throw new Error('User already exists');

    const user = new User(username, email, hashedPassword, new Date());
    const createdUser = await userRepository.createUser(user);

    const profile = new Profile(
      createdUser.id,
      createdUser.username,
      '',
      '',
      '',
      new Date()
    );
    await profileRepository.createProfile(profile);

    return createdUser;
  }

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new Error('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
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
}

export default new AuthService();