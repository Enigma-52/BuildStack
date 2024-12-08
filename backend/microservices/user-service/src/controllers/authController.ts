import { RequestHandler } from 'express'
import * as authService from '../services/authService'
import { HttpException } from '../middleware/errorMiddleware'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await authService.signup({ name, email, password })
    res.status(201).json(user)
  } catch (error: any) {
    next(new HttpException(400, error.message))
  }
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.login({ email, password })
    res.status(200).json(user)
  } catch (error: any) {
    next(new HttpException(401, error.message))
  }
}

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.query;
    console.log(userId);
    if (!userId || typeof userId !== 'string') {
      throw new HttpException(400, 'User ID is required');
    }

    const user = await authService.getUserById(userId)
    console.log(user);
    res.status(200).json(user)
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message))
  }
}

export const sendOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body
    
    if (!email) {
      throw new HttpException(400, 'Email is required')
    }

    const result = await authService.sendOTP(email)
    res.status(200).json(result)
  } catch (error: any) {
    next(new HttpException(error.status || 500, error.message))
  }
}

export const verifyOTP: RequestHandler = async (req, res, next) => {
  try {
    const { email, otp } = req.body
    
    if (!email || !otp) {
      throw new HttpException(400, 'Email and OTP are required')
    }

    const result = await authService.verifyOTP(email, otp)
    res.status(200).json(result)
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message))
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
  profile_image_url?: string;
}

export const updateProfile: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { userId } = req.query;
    const { 
      name,
      email,
      headline,
      about,
      role,
      currentCompany,
      twitter,
      linkedin,
      github,
      profile_url,
    } = req.body;

    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ error: 'Invalid userId' });
    }

    const profileData: UpdateProfileData = {
      name,
      email,
      headline,
      about,
      role,
      currentCompany,
      twitter_url: twitter,
      linkedin_url: linkedin,
      github_url: github,
      profile_image_url: profile_url
    };

    if (typeof userId !== 'string') {
      throw new HttpException(400, 'Invalid userId');
    }

    const updatedUser = await authService.updateProfile(userId, profileData);

    res.status(201).json(updatedUser);
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message));
  }
}

export const getAllUsers: RequestHandler = async (req, res, next)=> {
  try {
    const users = await authService.getAllUsers();

    res.status(201).json(users);
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message));
  }
}

export const messageSubmission: RequestHandler = async (req, res, next) => {
  try {
    const messageData: Message = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      createdAt: new Date()
    };

    // Validate the incoming data
    const validationError = validateMessage(messageData);
    if (validationError) {
      throw new HttpException(400, validationError);
    }

    // Initialize the message service

    // Submit the message
    const savedMessage = await authService.createMessage(messageData);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data: savedMessage
    });

  } catch (error: any) {
    next(new HttpException(400, error.message));
  }
};

interface Message {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}
export const validateMessage = (data: Message): string | null => {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters long';
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    return 'Please provide a valid email address';
  }
  
  if (!data.message || data.message.trim().length < 10) {
    return 'Message must be at least 10 characters long';
  }
  
  return null;
};

export const isValidEmail = (email: string): boolean => {
  // Basic email format check using RFC 5322 standard
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Check length constraints
  if (email.length > 254) {
    return false;
  }

  // Check if matches RFC 5322 format
  if (!emailRegex.test(email)) {
    return false;
  }

  // Check if domain has at least one dot
  const [localPart, domain] = email.split('@');
  if (!domain || !domain.includes('.')) {
    return false;
  }

  if (!localPart || !localPart.length ) {
    return false;
  }

  // Check local part and domain lengths
  if (localPart.length > 64 || domain.length > 255) {
    return false;
  }

  return true;
};

// message.controller.ts
export const getMessages: RequestHandler = async (req, res, next) => {
  try {
    const messages = await authService.getMessages();
    console.log("messages", messages);
    res.status(200).json({ // Changed to 200 for successful GET requests
      success: true,
      messages: messages    // Return in expected format for frontend
    });
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message));
  }
};

export const replyMessage: RequestHandler = async (req, res, next) => {
  try {
    const {messageId} = req.params;
    const { response } = req.body;

    console.log("messageId", messageId);
    console.log("reply", response);
    const updatedMessage = await authService.replyMessage(messageId!, response);
    res.status(200).json(updatedMessage);
  } catch (error: any) {
    next(new HttpException(error.status || 400, error.message));
  }
}
