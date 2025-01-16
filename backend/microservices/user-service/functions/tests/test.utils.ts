// Define interfaces
export interface MockUser {
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
  
  export interface LoginResponse {
    user: MockUser;
    token: string;
  }
  
  // Type the mock functions
  export interface AuthServiceMock {
    signup: jest.Mock<Promise<MockUser>, [SignupData]>;
    login: jest.Mock<Promise<LoginResponse>, [LoginData]>;
    getUserById: jest.Mock<Promise<MockUser>, [string]>;
    sendOTP: jest.Mock<Promise<{ message: string }>, [{ email: string }]>;
    verifyOTP: jest.Mock<Promise<{ verified: boolean }>, [{ email: string, otp: string }]>;
    updateProfile: jest.Mock<Promise<MockUser>, [string, UpdateProfileData]>;
    getAllUsers: jest.Mock<Promise<MockUser[]>, []>;
    createMessage: jest.Mock<Promise<any>, [any]>;
    getMessages: jest.Mock<Promise<any>, []>;
    replyMessage: jest.Mock<Promise<any>, [any]>;
  }
  
  // Additional interfaces needed
  interface SignupData {
    name: string;
    email: string;
    password: string;
  }
  
  interface LoginData {
    email: string;
    password: string;
  }
  
  interface UpdateProfileData {
    name?: string;
    email?: string;
    headline?: string;
    about?: string;
    role?: string;
    currentCompany?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    profile_url?: string;
  }