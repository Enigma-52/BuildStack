import mongoose from 'mongoose';
import 'winston-mongodb';

let mongoConnected = false;

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    const mongoUri = process.env['MONGODB_URI'] as string;
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
      authSource: 'admin',
      retryWrites: true,
    });
    
    mongoConnected = true;
    // Remove await from console.log since it's not needed
    console.log('Successfully connected to MongoDB Atlas for auth logging');
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas for auth logging:', error);
    mongoConnected = false;
  }
};

connectMongoDB();

// Auth Log Schema remains the same...
const authLogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  eventType: {
    type: String,
    enum: ['LOGIN_ATTEMPT', 'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'SIGNUP', 'TOKEN_VERIFY', 'PASSWORD_RESET'],
    required: true,
    index: true
  },
  userId: {
    type: String,
    sparse: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['SUCCESS', 'FAILURE'],
    required: true
  },
  failureReason: String,
  metadata: mongoose.Schema.Types.Mixed
});

// TTL index to automatically delete logs after 90 days
authLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export const AuthLog = mongoose.model('AuthLog', authLogSchema);

export const safeLogAuthEvent = async (logData: {
  eventType: string;
  email: string;
  userId?: string | null;
  status: string;
  failureReason?: string | null;
  req: any;
  metadata?: any;
}) => {
  if (!mongoConnected) {
    console.warn('MongoDB not connected - skipping auth log');
    return;
  }

  try {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('MongoDB operation timed out')), 5000);
    });

    await Promise.race([
      AuthLog.create({
        eventType: logData.eventType,
        email: logData.email,
        userId: logData.userId,
        status: logData.status,
        failureReason: logData.failureReason,
        ipAddress: logData.req.ip,
        userAgent: logData.req.get('user-agent'),
        metadata: {
          ...logData.metadata,
          timestamp: new Date()
        }
      }),
      timeout
    ]);
  } catch (error) {
    console.error('Failed to create auth log:', error);
    // Don't throw the error - just log it and continue
  }
};