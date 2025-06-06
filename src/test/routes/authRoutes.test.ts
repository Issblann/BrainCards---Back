import express from 'express';
import request from 'supertest';
import authRoutes from '../../routes/authRoutes';
import authService from '../../services/authService';
import authMiddleware from '../../infrastructure/middleware/authMiddleware';
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

const agent = request.agent(app);
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

  it('should return 200 when calling POST /auth/login', async () => {
    authService.login = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).post('/auth/login').send({
      email: 'test5.com',
      password: '123456',
    });

    expect(response.header['set-cookie']).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);

    expect(authService.login).toHaveBeenCalledTimes(1);
  });

  it('should return 200 when calling POST /auth/register', async () => {
    const mockRegister = {
      username: 'test13',
      email: 'test13.com',
      password: '$2b$10$1Mb8HaJFdZ1gQ0WMVwXogeaQB9U1Rxs8O82AmJXdoucZpyGaEvi/W',
    };

    authService.register = jest.fn().mockResolvedValue(mockRegister);

    const response = await request(app).post('/auth/register').send({
      email: 'test13.com',
      username: 'test13',
      password: '123456',
    });

    expect(response.body).toEqual(mockRegister);
    expect(response.status).toBe(200);
  });

  it('should return 200 when calling POST /auth/logout', async () => {
    const loginResponse = await request(app).post('/auth/login').send({
      email: 'test5.com',
      password: '123456',
    });

    const cookie = loginResponse.header['set-cookie'];
    expect(cookie).toBeDefined();
    expect(loginResponse.status).toBe(200);

    // const middleware = jest.fn().mockImplementation(authMiddleware);
    const response = await request(app)
      .post('/auth/logout')
      .set('Cookie', cookie);

    console.log(response.body);
  });
});
