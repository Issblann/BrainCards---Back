import { Profile } from '../entities/Profile';

export interface IProfileRepository {
  createProfile(profile: Profile): Promise<void>;
  getProfileByUserId(userId: string): Promise<Profile | null>;
  updateProfileById(id: string, profile: Profile): Promise<Partial<Profile>>;
}
