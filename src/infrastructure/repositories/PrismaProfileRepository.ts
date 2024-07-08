import { PrismaClient } from '@prisma/client';
import { IProfileRepository } from '../../domain/repositories/IProfileRepository';
import { Profile } from '../../domain/entities/Profile';

class PrismaProfileRepository implements IProfileRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async createProfile(profile: Profile): Promise<void> {
    const resultcreateprofile = await this.prismaClient.profile.create({
      data: {
        userId: profile.userId,
        name: profile.name,
        lastName: profile.lastName,
        bio: profile.bio,
        image: profile.image,
        updatedAt: new Date(),
      },
    });

    console.log(resultcreateprofile);
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const profileData = await this.prismaClient.profile.findUnique({
      where: { userId },
    });

    if (!profileData) {
      return null;
    }

    return new Profile(
      profileData.userId,
      profileData.name,
      profileData.lastName || '',
      profileData.bio || '',
      profileData.image || '',
      profileData.updatedAt
    );
  }

  async updateProfile(profile: Profile): Promise<void> {
    await this.prismaClient.profile.update({
      where: { id: profile.id },
      data: {
        name: profile.name,
        lastName: profile.lastName,
        bio: profile.bio,
        image: profile.image,
        updatedAt: new Date(),
      },
    });
  }
}

export default PrismaProfileRepository;
