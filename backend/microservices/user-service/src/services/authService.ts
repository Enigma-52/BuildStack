import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserSignup, IUserLogin, IUser, IUserOTPVerification } from '../interfaces/user.interface'
import { AuthLog } from '../logger/authLogger';
import { UserOTPVerification } from '../models/UserOTPverification';
import nodemailer from 'nodemailer'
import { Request, Response } from 'express'


const prisma = new PrismaClient()
const JWT_SECRET = process.env['JWT_SECRET'] as string;

if (!JWT_SECRET) {
	console.warn('Warning: JWT_SECRET not set in environment variables')
}

const transporter = nodemailer.createTransport({
	service: 'gmail', // or your email service
	auth: {
		user: process.env.EMAIL_USER, // your email
		pass: process.env.EMAIL_PASS  // app password or email password
	}
});

const generateOTP = (): string => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

export const signup = async (userData: IUserSignup) => {
	try {

		const existingUser = await prisma.user.findUnique({
			where: { email: userData.email }
		});

		if (existingUser) {
			throw new Error('User already exists');
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10)

		const user = await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
				password: hashedPassword,
				isVerified: false,
			}
		});

		const otp = generateOTP();
		const hashedOTP = await bcrypt.hash(otp, 10);

		await prisma.UserOTPVerification.create({
			data: {
				userId: user.id,
				otp: hashedOTP,
				createdAt: Date.now(),
				expiresAt: Date.now() + 600000
			}
		});

		const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: 'Verify Your Account',
            html: `
                <div>
                    <h2>Email Verification</h2>
                    <p>Your OTP is: ${otp}</p>
                    <p>This OTP will expire in 15 minutes.</p>
                </div>
            `
        };

		await transporter.sendMail(mailOptions);

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

export const verifyOTP = async (userId: string, otp: string) => {
    try {
        // Find OTP verification record
        const otpRecord = await prisma.userOTPVerification.findUnique({
            where: { userId }
        });

        if (!otpRecord) {
            throw new Error('OTP record not found');
        }

        // Check if OTP is expired
        if (otpRecord.expiresAt < new Date()) {
            // Delete expired OTP record
            await prisma.userOTPVerification.delete({
                where: { userId }
            });
            throw new Error('OTP has expired');
        }

        // Verify OTP
        const isOTPValid = await bcrypt.compare(otp, otpRecord.otp);

        if (!isOTPValid) {
            throw new Error('Invalid OTP');
        }

        // Update user as verified
        await prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true }
        });

        // Delete OTP record after successful verification
        await prisma.userOTPVerification.delete({
            where: { userId }
        });

	

        // Generate token after verification
        const token = generateToken(user.id);

        return {
            message: 'Email verified successfully',
			id: user.id,
            name: user.name,
            email: user.email,
			token
        };
    } catch (error) {
        throw error;
    }
};



export const sendUserOTPVerificationEmail = async (userData: IUserOTPVerification, res: Response, req: Request) => {
	try {


		const user = await prisma.user.findUnique({

			where: { email: userData.email }

		});

		const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

		const mailOptions = {
			from: process.env.AUTH_EMAIL,
			to: email,
			subject: "Verify your email",
			html: req.body,
		};

		const hashedOTP = await bcrypt.hash(otp, 10)

		const newOTPVerification = await new UserOTPVerification({
			userId: id,
			otp: hashedOTP,
			createdAt: Date.now(),
			expiresAt: Date.now() + 600000
		});

		await newOTPVerification.save();
		transporter.sendMail(mailOptions);


	} catch (error) {
		res.json({
			status: "FAILED",
			message: error.message,
		});
	}
}

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

	const validPassword = await bcrypt.compare(credentials.password, user.password)

	if (!validPassword) {
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