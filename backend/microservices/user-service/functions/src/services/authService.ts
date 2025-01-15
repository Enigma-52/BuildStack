import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserSignup, IUserLogin } from '../interfaces/user.interface.js'
import { AuthLog } from '../logger/authLogger.js';
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

    const profile_image = `https://api.dicebear.com/9.x/dylan/svg?seed=${userData.name}`

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        profile_image_url: profile_image
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
    })
  
    if (!user) {
      throw new Error('User not found')
    }
  
    return user;
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

  interface UpdateProfileData {
    name: string;
    email: string;
    headline: string;
    about: string;
    role: string;
    currentCompany: string;
    twitter_url: string;
    linkedin_url: string;
    github_url: string;
  }

  export const updateProfile = async (
    userId: string, 
    profileData: UpdateProfileData
  ): Promise<{ id: string }> => {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: profileData,
      select: {
        id: true,
      }
    });
    
    return updatedUser;
  }

  export const getAllUsers = async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error: any) {
      throw error;
    }
  }

  interface Message {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
  }


  export const createMessage = async (messageData: Message): Promise<Message> =>{
    try {
      return await prisma.message.create({
        data: {
          ...messageData,
          status: 'PENDING',
        },
      });
    } catch (error) {
      throw error;
    }
  }
// message.service.ts
export const getMessages = async () => {
  try {
    const msgs =  await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc'  
      }
    });
    console.log("msgs", msgs);
    return msgs;
  } catch (error) {
    throw error;
  }
};

export const replyMessage = async (messageId: string, responseText: string) => {
  try {
    // First verify we have a valid ID
    if (!messageId) {
      throw new Error('Message ID is required');
    }

    // Get message details from database with explicit ID
    const message = await prisma.message.findFirst({
      where: {
        id: messageId
      }
    });

    if (!message) {
      throw new Error('Message not found');
    }

    // Update message with explicit ID match
    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId
      },
      data: {
        status: 'RESPONDED',
      }
    });

    // Send email using nodemailer...
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
      }
    });

    await transporter.sendMail({
      from: process.env['EMAIL_USER'],
      to: message.email,
      subject: 'Response to Your Inquiry',
      html: `
        <div>
          <p>Your message: ${message.message}</p>
          <p>BuildStack response: ${responseText}</p>
        </div>
      `
    });

    return updatedMessage;

  } catch (error) {
    console.error('Error in replyMessage:', error);
    throw error;
  }
};