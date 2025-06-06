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
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = require("../../domain/entities/Profile");
class PrismaProfileRepository {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    createProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultcreateprofile = yield this.prismaClient.profile.create({
                data: {
                    userId: profile.userId || '',
                    name: profile.name,
                    lastName: profile.lastName,
                    bio: profile.bio,
                    image: profile.image,
                    updatedAt: new Date(),
                },
            });
            console.log(resultcreateprofile);
        });
    }
    getProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileData = yield this.prismaClient.profile.findUnique({
                where: { userId },
            });
            if (!profileData) {
                return null;
            }
            return new Profile_1.Profile(profileData.userId, profileData.name, profileData.lastName || '', profileData.bio || '', profileData.image || '', profileData.updatedAt, profileData.id);
        });
    }
    updateProfileById(id, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProfileData = yield this.prismaClient.profile.findUnique({
                where: { id },
            });
            const profileData = yield this.prismaClient.profile.update({
                where: { id: id },
                data: Object.assign(Object.assign({}, getProfileData), { name: profile.name ? profile.name : getProfileData === null || getProfileData === void 0 ? void 0 : getProfileData.name, lastName: profile.lastName
                        ? profile.lastName
                        : getProfileData === null || getProfileData === void 0 ? void 0 : getProfileData.lastName, bio: profile.bio ? profile.bio : getProfileData === null || getProfileData === void 0 ? void 0 : getProfileData.bio, image: profile.image ? profile.image : getProfileData === null || getProfileData === void 0 ? void 0 : getProfileData.image }),
            });
            return profileData;
        });
    }
}
exports.default = PrismaProfileRepository;
//# sourceMappingURL=PrismaProfileRepository.js.map