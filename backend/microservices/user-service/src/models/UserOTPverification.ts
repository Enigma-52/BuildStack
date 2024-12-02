import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUserOTPVerification extends mongoose.Document {
    userId: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

const UserOTPVerificationSchema = new Schema<IUserOTPVerification>({
    userId: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

export const UserOTPVerification = mongoose.model<IUserOTPVerification>(
    "UserOTPVerification" , UserOTPVerificationSchema
);
