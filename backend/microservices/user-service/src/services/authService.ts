import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserSignup, IUserLogin } from '../interfaces/user.interface'

const prisma = new PrismaClient()
const JWT_SECRET = process.env['JWT_SECRET'] as string;

if (!JWT_SECRET) {
    console.warn('Warning: JWT_SECRET not set in environment variables')
}

export const signup = async (userData: IUserSignup) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    }
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}

export const login = async (credentials: IUserLogin) => {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const validPassword = await bcrypt.compare(credentials.password, user.password)

  if (!validPassword) {
    throw new Error('Invalid password')
  }

  const token = generateToken(user.id)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token
  }
}

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profile_image_url: true,
        website_url: true,
        twitter_handle: true,
        karma_points: true,
        is_maker: true,
        location: true,
        skills: true,
        createdAt: true,
        updatedAt: true
      }
    })
  
    if (!user) {
      throw new Error('User not found')
    }
  
    return user
  }
  
  export const generateToken = (userId: string): string => {
    try {
      return jwt.sign(
        { userId }, 
        JWT_SECRET, 
        { expiresIn: '24h' }
      )
    } catch (error) {
      throw new Error('Error generating token')
    }
  }
  
  export const verifyToken = (token: string): { userId: string } => {
    try {
      return jwt.verify(token, JWT_SECRET) as { userId: string }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }