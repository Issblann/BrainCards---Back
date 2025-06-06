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
const User_1 = require("../domain/entities/User");
const prismaClient_1 = __importDefault(require("../infrastructure/database/prismaClient"));
const PrismaUserRepository_1 = __importDefault(require("../infrastructure/repositories/PrismaUserRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const PrismaProfileRepository_1 = __importDefault(require("../infrastructure/repositories/PrismaProfileRepository"));
const Profile_1 = require("../domain/entities/Profile");
const boxService_1 = __importDefault(require("./boxService"));
const deckService_1 = __importDefault(require("./deckService"));
const userRepository = new PrismaUserRepository_1.default(prismaClient_1.default);
const profileRepository = new PrismaProfileRepository_1.default(prismaClient_1.default);
class AuthService {
    generateToken(user) {
        if (!env_1.default.jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const tokenPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, env_1.default.jwtSecret);
        return token;
    }
    register(email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password || '', 10);
            if ((yield userRepository.findUserByEmail(email)) ||
                (yield userRepository.findUserByUsername(username)))
                throw new Error('User already exists');
            const user = new User_1.User(username, email, hashedPassword, new Date());
            const createdUser = yield userRepository.createUser(user);
            const profile = new Profile_1.Profile(createdUser.id || '', createdUser.username, '', '', '', new Date());
            yield profileRepository.createProfile(profile);
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
            const createdBox = yield boxService_1.default.createBox(box);
            yield deckService_1.default.createDeck({
                userId: createdUser.id,
                title: 'Example Deck',
                boxId: createdBox.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return createdUser;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findUserByEmail(email);
            if (!user)
                throw new Error('User not found');
            const isPasswordValid = yield bcrypt_1.default.compare(password || '', user.password);
            if (!isPasswordValid)
                throw new Error('Invalid credentials');
            if (!env_1.default.jwtSecret) {
                throw new Error('JWT_SECRET is not defined');
            }
            let profile = yield profileRepository.getProfileByUserId(user.id);
            if (!profile) {
                profile = new Profile_1.Profile(user.id, user.username, '', '', '', new Date());
                yield profileRepository.createProfile(profile);
            }
            return user;
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository.findUserByEmail(email);
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map