import { Profile } from '../entities/Profile';

export interface IProfileRepository {
  createProfile(profile: Profile): Promise<void>;
  getProfileByUserId(userId: string): Promise<Profile | null>;
  updateProfile(profile: Profile): Promise<void>;
}
