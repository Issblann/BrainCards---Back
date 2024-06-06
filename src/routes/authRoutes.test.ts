import express from 'express';
import request from 'supertest';
import authRoutes from './authRoutes';
import authService from '../services/authService';
import envs from '../config/env';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  req.cookies = {
    token: envs.jwtSecret,
  };
  next();
});

describe('authRoutes testing', () => {
  it('should return 200 when calling POST /auth/login', async () => {
    const mockUser = {
      username: 'test5',
      email: 'test5.com',
      password: '$2b$10$b/7fGL1GCrulSDn2proq7uYY7adgiM9RD4eCx3NVB8KeMpsv.gjzS',
      createdAt: '2024-06-01T03:16:39.784Z',
      updatedAt: '2024-06-01T03:16:39.784Z',
      id: 'clwvjkgrt0000bd3rimf9zo7z',
      message: 'Logged in successfully',
    };
    authService.login = jest.fn().mockResolvedValue(mockUser);

    const response = await request(app).post('/auth/login').send({
      email: 'test5.com',
      password: '123456',
    });

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

  //   it('should return 200 when calling POST /auth/logout', async () => {
  //     const responseLogin = await request(app).post('/auth/login').send({
  //       email: 'test5.com',
  //       password: '123456',
  //     });

  //     const token = responseLogin.body.token;

  //     const response = await request(app)
  //       .post('/auth/logout')
  //       .set('Authorization', `Bearer ${token}`);
  //     // const response = await request(app).post('/auth/logout');

  //     if (!envs.jwtSecret) {
  //       expect(response.status).toBe(500);
  //     }

  //     if (envs.jwtSecret) {
  //       expect(response.status).toBe(200);
  //     }
  //     //   expect(response.body).toEqual({ message: 'Logged out successfully' });
  //   });

  //   it('should return 401 when calling POST /auth/logout without authenticated user', async () => {
  //     // Simula una solicitud sin cookie de autenticación
  //     const response = await request(app).post('/auth/logout');

  //     // Verifica si la solicitud devuelve un estado 401 Unauthorized
  //     expect(response.status).toBe(401);
  //   });
});
