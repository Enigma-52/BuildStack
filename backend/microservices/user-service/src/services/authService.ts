import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserSignup, IUserLogin } from '../interfaces/user.interface'
import { AuthLog } from '../logger/authLogger';
import nodemailer from 'nodemailer';
import { LocalStorage } from 'node-localstorage';
const prisma = new PrismaClient()
const JWT_SECRET = process.env['JWT_SECRET'] as string;

if (!JWT_SECRET) {
    console.warn('Warning: JWT_SECRET not set in environment variables')
}

const localStorage = new LocalStorage('./scratch');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email service

  auth: {
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASS'],
  }
});

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (email: string) => {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if(existingUser) {
      throw new Error("User already exists!");
    }
    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database with expiration
    const otpData = {
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes from now
    };

    await transporter.verify()
    console.log('SMTP server is ready');

    // Send OTP via email
    await transporter.sendMail({
      from: process.env['EMAIL_USER'],
      to: email,
      subject: 'Your OTP for Build Stack',
      html: `Your OTP is: ${otp}. It will expire in 10 minutes.`
    });

    localStorage.setItem(`otp_${email}`, JSON.stringify(otpData));

    return { message: 'OTP sent successfully' };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};


export const verifyOTP = async (email: string, otp: string) => {
  try {
    // Find OTP record
    const storedOtpString = localStorage.getItem(`otp_${email}`);

    if (!storedOtpString) {
      throw new Error('No OTP found for this email');
    }

    const storedOtpData = JSON.parse(storedOtpString);

    // Check if OTP is valid and not expired
    if (
      storedOtpData.otp !== otp || 
      storedOtpData.expiresAt < Date.now()
    ) {
      throw new Error('Invalid or expired OTP');
    }

    // Remove the OTP from local storage after successful verification
    localStorage.removeItem(`otp_${email}`);

    return { message: 'OTP verified successfully' };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};


export const signup = async (userData: IUserSignup) => {
  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      }
    });

    if(existingUser) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      }
    })

    const token = generateToken(user.id);

    await AuthLog.create({
      eventType: 'SIGNUP',
      email: userData.email,
      userId: user.id,
      status: 'SUCCESS',
      metadata: {
        name: userData.name,
        timestamp: new Date()
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  } catch (error) {
    // Log failed signup
    await AuthLog.create({
      eventType: 'SIGNUP',
      email: userData.email,
      status: 'FAILURE',
      failureReason: error,
      metadata: {
        name: userData.name,
        timestamp: new Date()
      }
    });
    throw error;
  }
};

export const login = async (credentials: IUserLogin) => {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email }
  })

  if (!user) {
    await AuthLog.create({
      eventType: 'LOGIN_ATTEMPT',
      email: credentials.email,
      status: 'FAILURE',
      failureReason: 'User not found',
      metadata: {
        timestamp: new Date()
      }
    });
    throw new Error('User not found');
  }

  const validPassword = await prisma.user.findUnique({
    where: { email: credentials.email },
    select: {
      password: true
    }
  })

  if (!validPassword) {
    await AuthLog.create({
      eventType: 'LOGIN_ATTEMPT',
      email: credentials.email,
      status: 'FAILURE',
      failureReason: 'User not found',
      metadata: {
        timestamp: new Date()
      }
    });
    throw new Error('User not found');
  }
  console.log('credentials.password:', credentials.password);
  console.log('user.password:', validPassword.password);


  const isValid = await bcrypt.compare(credentials.password, validPassword.password)

  if (!isValid) {
    await AuthLog.create({
      eventType: 'LOGIN_ATTEMPT',
      email: credentials.email,
      userId: user.id,
      status: 'FAILURE',
      failureReason: 'Invalid password',
      metadata: {
        timestamp: new Date()
      }
    });
    throw new Error('Invalid password');
  }

  if (!validPassword) {
    throw new Error('Invalid password')
  }

  const token = generateToken(user.id);

  await AuthLog.create({
    eventType: 'LOGIN_SUCCESS',
    email: credentials.email,
    userId: user.id,
    status: 'SUCCESS',
    metadata: {
      timestamp: new Date()
    }
  });

  const responseObject = {
    id: user.id,
    name: user.name,
    email: user.email,
    token: token
  };

  console.log('responseObject:', responseObject);

  return responseObject;
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