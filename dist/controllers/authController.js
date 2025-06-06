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
const authService_1 = __importDefault(require("../services/authService"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Register user
            try {
                const { email, username, password } = req.body;
                if (!email || !username || !password)
                    throw new Error('All fields are required');
                const user = yield authService_1.default.register(email, username, password);
                res.json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Login user
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    throw new Error('All fields are required');
                const user = yield authService_1.default.login(email, password);
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                }
                const token = authService_1.default.generateToken(user);
                res.cookie('token', token);
                res.json(Object.assign(Object.assign({}, user), { message: 'Logged in successfully' }));
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
    // Logout user
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = req.cookies.token;
                if (!cookie)
                    throw new Error('Token not provided');
                res.clearCookie('token');
                res.status(200).send({ meesage: 'Logged out successfully' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'An unknown error occurred with logout' });
            }
        });
    }
    googleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Google auth
            const { id, email, username, password } = req.body;
            try {
                let user = yield authService_1.default.findUserByEmail(email);
                if (!user) {
                    user = yield authService_1.default.register(email, username, id);
                }
                else {
                    user = yield authService_1.default.login(email);
                }
                const token = authService_1.default.generateToken(user);
                res.json({ user, token });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ error: 'An unknown error occurred with google auth' });
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map