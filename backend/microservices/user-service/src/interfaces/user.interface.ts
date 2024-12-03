export interface IUser {
  id: string
  name: string
  email: string
  password: string
  full_name: string
  bio?: string
  profile_image_url?: string
  website_url?: string
  twitter_handle?: string
  karma_points: number
  is_maker: boolean
  location?: string
  skills: string[]
  isVerified: boolean
}

export interface IUserSignup {
  name: string
  email: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IUserResponse {
  id: string
  name: string
  email: string
  full_name: string
  token: string
}

export interface IUserOTPVerification {
  id: string
  email: string
}