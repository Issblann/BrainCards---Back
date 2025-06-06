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
const profileService_1 = __importDefault(require("../services/profileService"));
class ProfileController {
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get user profile
            const { userId } = req.params;
            try {
                if (!userId)
                    throw new Error('User id is required');
                const profile = yield profileService_1.default.getProfileByUserId(userId);
                if (!profile) {
                    return res.status(404).json({ message: 'Profile not found' });
                }
                res.json(profile);
            }
            catch (error) {
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Server error', error });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    // Update user profile
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, bio } = req.body;
            const { id } = req.params;
            try {
                if (!id)
                    throw new Error('Profile id is required');
                const imagePath = req.file ? req.file.path : null;
                const profile = {
                    name,
                    lastName,
                    bio,
                    image: imagePath,
                };
                const profileData = yield profileService_1.default.updateProfile(id, profile);
                res.json({ profile: profileData, message: 'Profile updated' });
            }
            catch (error) {
                if (bio && typeof bio !== 'string') {
                    return res.status(400).json({ message: 'Bio must be a string' });
                }
                if (lastName && typeof lastName !== 'string') {
                    return res.status(400).json({ message: 'Last name must be a string' });
                }
                if (name && typeof name !== 'string') {
                    return res.status(400).json({ message: 'Name must be a string' });
                }
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        });
    }
}
exports.default = new ProfileController();
//# sourceMappingURL=profileController.js.map