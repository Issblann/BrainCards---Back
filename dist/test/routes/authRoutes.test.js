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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const authRoutes_1 = __importDefault(require("../../routes/authRoutes"));
const authService_1 = __importDefault(require("../../services/authService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
const agent = supertest_1.default.agent(app);
describe('authRoutes testing', () => {
    const mockUser = {
        username: 'test5',
        email: 'test5.com',
        password: '$2b$10$b/7fGL1GCrulSDn2proq7uYY7adgiM9RD4eCx3NVB8KeMpsv.gjzS',
        createdAt: '2024-06-01T03:16:39.784Z',
        updatedAt: '2024-06-01T03:16:39.784Z',
        id: 'clwvjkgrt0000bd3rimf9zo7z',
        message: 'Logged in successfully',
    };
    it('should return 200 when calling POST /auth/login', () => __awaiter(void 0, void 0, void 0, function* () {
        authService_1.default.login = jest.fn().mockResolvedValue(mockUser);
        const response = yield (0, supertest_1.default)(app).post('/auth/login').send({
            email: 'test5.com',
            password: '123456',
        });
        expect(response.header['set-cookie']).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
        expect(authService_1.default.login).toHaveBeenCalledTimes(1);
    }));
    it('should return 200 when calling POST /auth/register', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRegister = {
            username: 'test13',
            email: 'test13.com',
            password: '$2b$10$1Mb8HaJFdZ1gQ0WMVwXogeaQB9U1Rxs8O82AmJXdoucZpyGaEvi/W',
        };
        authService_1.default.register = jest.fn().mockResolvedValue(mockRegister);
        const response = yield (0, supertest_1.default)(app).post('/auth/register').send({
            email: 'test13.com',
            username: 'test13',
            password: '123456',
        });
        expect(response.body).toEqual(mockRegister);
        expect(response.status).toBe(200);
    }));
    it('should return 200 when calling POST /auth/logout', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app).post('/auth/login').send({
            email: 'test5.com',
            password: '123456',
        });
        const cookie = loginResponse.header['set-cookie'];
        expect(cookie).toBeDefined();
        expect(loginResponse.status).toBe(200);
        // const middleware = jest.fn().mockImplementation(authMiddleware);
        const response = yield (0, supertest_1.default)(app)
            .post('/auth/logout')
            .set('Cookie', cookie);
        console.log(response.body);
    }));
});
//# sourceMappingURL=authRoutes.test.js.map