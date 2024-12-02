import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { validateProductData } from '../middleware/validation';
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {  try {
    const data = req.body;
    console.log('Incoming data:', data);
    validateProductData(data);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        websiteUrl: data.websiteUrl,
        category: data.category,
        videoUrl: data.videoUrl,
        techStack: data.techStack,
        targetAudience: data.targetAudience,
        userId: data.userId,
        images: {
          create: data.images.map(() => ({
            url: "temp-image-url" // Temporary until image upload
          }))
        },
        pricing: {
          create: [
            {
              tier: 'free',
              features: data.pricing.tiers[0].features
            },
            {
              tier: 'pro',
              features: data.pricing.tiers[1].features
            }
          ]
        },
        makers: {
          create: [] 
        }
      },
      include: {
        images: true,
        pricing: true,
        makers: true
      }
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error });
  }
};
