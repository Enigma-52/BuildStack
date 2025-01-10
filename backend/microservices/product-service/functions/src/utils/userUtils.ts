// utils/userUtils.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getUserIdFromProduct = async (productId: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      select: {
        userId: true
      }
    });

    if (!product) {
      return null;
    }

    return product.userId;
  } catch (error) {
    console.error('Error getting userId from product:', error);
    return null;
  }
};

// Get user details
export const getUserDetails = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        profile_image_url: true,
        role: true
      }
    });

    return user;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
};