import request from 'supertest'
import app from '../src/app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Auth Endpoints', () => {
  const testUser = {
    name: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    full_name: 'Test User'
  }

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  describe('POST /api/auth/signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser)
        
      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('token')
      expect(res.body.email).toBe(testUser.email)
      expect(res.body).not.toHaveProperty('password')
    })

    it('should not allow duplicate email', async () => {
      // First signup
      await request(app)
        .post('/api/auth/signup')
        .send(testUser)

      // Try to signup with same email
      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a user before login tests
      await request(app)
        .post('/api/auth/signup')
        .send(testUser)
    })

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body.email).toBe(testUser.email)
    })

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
    })
  })

  describe('GET /api/auth/profile', () => {
    let authToken: string

    beforeEach(async () => {
      // Create user and get token
      const res = await request(app)
        .post('/api/auth/signup')
        .send(testUser)
      
      authToken = res.body.token
    })

    it('should get profile with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toBe(200)
      expect(res.body.email).toBe(testUser.email)
      expect(res.body).not.toHaveProperty('password')
    })

    it('should not get profile without token', async () => {
      const res = await request(app)
        .get('/api/auth/profile')

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
    })

    it('should not get profile with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token')

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error')
    })
  })
})