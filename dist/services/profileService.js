"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../infrastructure/database/prismaClient"));
const PrismaProfileRepository_1 = __importDefault(require("../infrastructure/repositories/PrismaProfileRepository"));
const profileRepository = new PrismaProfileRepository_1.default(prismaClient_1.default);
class ProfileService {
    getProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('User id is required');
            }
            return profileRepository.getProfileByUserId(userId);
        });
    }
    updateProfile(id, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error('Profile id is required');
            }
            const updatedData = {
                name: profileData.name,
                lastName: profileData.lastName,
                bio: profileData.bio,
                image: profileData.image,
            };
            const updatedProfile = yield profileRepository.updateProfileById(id, updatedData);
            return updatedProfile;
        });
    }
}
exports.default = new ProfileService();
//# sourceMappingURL=profileService.js.map