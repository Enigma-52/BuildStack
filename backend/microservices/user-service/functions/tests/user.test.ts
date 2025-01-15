import request from 'supertest';
import app from '../src/app';
import { it, describe, expect, beforeEach, jest } from '@jest/globals';
import * as authService from '../src/services/authService';

// Mock auth service
jest.mock('../src/services/authService');

// Define interfaces
interface MockUser {
  id: string;
  name: string;
  email: string;
  headline?: string;
  about?: string;
  role?: string;
  currentCompany?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
  profile_image_url?: string;
}

interface LoginResponse {
  user: MockUser;
  token: string;
}

// Type the mock functions
type AuthServiceMock = {
  signup: jest.Mock<() => Promise<MockUser>>;
  login: jest.Mock<() => Promise<LoginResponse>>;
  getUserById: jest.Mock<() => Promise<MockUser>>;
  sendOTP: jest.Mock<() => Promise<{ message: string }>>;
  verifyOTP: jest.Mock<() => Promise<{ verified: boolean }>>;
  updateProfile: jest.Mock<() => Promise<MockUser>>;
  getAllUsers: jest.Mock<() => Promise<MockUser[]>>;
};

// Mock user data
const mockUser: MockUser = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  headline: 'Software Engineer',
  about: 'Test bio',
  role: 'Developer',
  currentCompany: 'Test Corp',
  twitter_url: 'https://twitter.com/test',
  linkedin_url: 'https://linkedin.com/test',
  github_url: 'https://github.com/test',
  profile_image_url: 'https://example.com/image.jpg'
};

describe('Health check request', () => {
  it('should return HTTP 200 OK for health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

describe('Auth API Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Type assert the mocked service
    const mockedAuthService = authService as unknown as AuthServiceMock;
    
    // Setup default mocks for auth service
    mockedAuthService.signup.mockResolvedValue(mockUser);
    mockedAuthService.login.mockResolvedValue({ 
      user: mockUser, 
      token: 'mock-token' 
    });
    mockedAuthService.getUserById.mockResolvedValue(mockUser);
    mockedAuthService.sendOTP.mockResolvedValue({ message: 'OTP sent successfully' });
    mockedAuthService.verifyOTP.mockResolvedValue({ verified: true });
    mockedAuthService.updateProfile.mockResolvedValue(mockUser);
    mockedAuthService.getAllUsers.mockResolvedValue([mockUser]);
  });

  describe('Signup Endpoint', () => {
    const signupData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    it('should successfully create a new user', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(signupData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 for invalid signup data', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'invalid' });

      expect(response.status).toBe(404);
    });
  });

  describe('Login Endpoint', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should successfully login user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toBe(mockUser.id);
      expect(response.body.token).toBeDefined();
    });

    it('should return 404 for invalid credentials', async () => {
      const mockedAuthService = authService as unknown as AuthServiceMock;
      mockedAuthService.login.mockRejectedValue(new Error('Invalid credentials'));

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrong' });

      expect(response.status).toBe(404);
    });
  });

  describe('Get Profile Endpoint', () => {
    it('should successfully retrieve user profile', async () => {
      const response = await request(app)
        .get('/api/auth/profile')
        .query({ userId: mockUser.id });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 for missing userId', async () => {
      const response = await request(app)
        .get('/api/auth/profile');

      expect(response.status).toBe(404);
    });
  });

  describe('OTP Endpoints', () => {
    describe('Send OTP', () => {
      it('should successfully send OTP', async () => {
        const response = await request(app)
          .post('/api/auth/send-otp')
          .send({ email: 'test@example.com' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('OTP sent successfully');
      });

      it('should return 404 for missing email', async () => {
        const response = await request(app)
          .post('/api/auth/send-otp')
          .send({});

        expect(response.status).toBe(404);
      });
    });

    describe('Verify OTP', () => {
      it('should successfully verify OTP', async () => {
        const response = await request(app)
          .post('/api/auth/verify-otp')
          .send({ email: 'test@example.com', otp: '123456' });

        expect(response.status).toBe(200);
        expect(response.body.verified).toBe(true);
      });

      it('should return 404 for invalid OTP', async () => {
        const mockedAuthService = authService as unknown as AuthServiceMock;
        mockedAuthService.verifyOTP.mockRejectedValue(new Error('Invalid OTP'));

        const response = await request(app)
          .post('/api/auth/verify-otp')
          .send({ email: 'test@example.com', otp: '000000' });

        expect(response.status).toBe(404);
      });
    });
  });

  describe('Update Profile Endpoint', () => {
    const updateData = {
      name: 'Updated User',
      email: 'test@example.com',
      headline: 'Senior Engineer',
      about: 'Updated bio',
      role: 'Tech Lead',
      currentCompany: 'New Corp',
      twitter: 'https://twitter.com/updated',
      linkedin: 'https://linkedin.com/updated',
      github: 'https://github.com/updated',
      profile_url: 'https://example.com/updated.jpg'
    };

    it('should successfully update profile', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .query({ userId: mockUser.id })
        .send(updateData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 400 for invalid userId', async () => {
      const response = await request(app)
        .put('/api/auth/profile')
        .send(updateData);

      expect(response.status).toBe(400);
    });
  });

  describe('Get All Users Endpoint', () => {
    it('should successfully retrieve all users', async () => {
      const response = await request(app)
        .get('/api/auth/getAllUsers');

      expect(response.status).toBe(201);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toEqual([mockUser]);
    });
  });
});