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

  async updateProfile(id: string, profileData: Partial<Profile>) {
    if (!id) {
      throw new Error('Profile id is required');
    }
    const updatedData: Partial<Profile> = {
      name: profileData.name,
      lastName: profileData.lastName,
      bio: profileData.bio,
      image: profileData.image,
    };
    const updatedProfile = await profileRepository.updateProfileById(
      id,
      updatedData
    );
    console.log('updated profile', updatedProfile);
    return updatedProfile;
  }
}

export default new ProfileService();
