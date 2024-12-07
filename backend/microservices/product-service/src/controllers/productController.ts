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
    if (error instanceof Error) {
        return res.status(400).json({ 
            error: error.message,
            details: error.toString()
        });
    }
    // Fallback for unknown error types
    return res.status(500).json({ 
        error: 'An unexpected error occurred',
        details: JSON.stringify(error)
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    // Validate if name exists
    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    // Fetch product with all related data
    const product = await prisma.product.findFirst({
      where: {
        name: name
      },
      include: {
        images: true,
        pricing: true,
        makers: true
      }
    });

    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};