import { Profile } from '../domain/entities/Profile';
import prisma from '../infrastructure/database/prismaClient';
import PrismaProfileRepository from '../infrastructure/repositories/PrismaProfileRepository';

const profileRepository = new PrismaProfileRepository(prisma);

class ProfileService {
  async getProfileByUserId(userId: string) {
    if (!userId) {
      throw new Error('User id is required');
    }
    return profileRepository.getProfileByUserId(userId);
  }

  async updateProfile(profile: Profile) {
    if (!profile.id) {
      throw new Error('Profile id is required');
    }
    return profileRepository.updateProfile(profile);
  }
}

export default new ProfileService();
