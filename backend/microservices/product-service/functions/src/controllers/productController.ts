import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { validateProductData } from '../middleware/validation.js';
import client from '../config/redisClient.js'; 
import nodemailer from 'nodemailer'

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response , _next: NextFunction): Promise<void> => {  try {
    const data = req.body;
    console.log('Incoming data:', data);
    validateProductData(data);

    const imageCreateData = data.images.map((imageUrl: string) => ({
      url: imageUrl
    }));

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
        upvotes: data.upvotes || 0,
        comments: {
          create: [] // Initialize empty comments array
        },
        images: {
          create: imageCreateData // Use the processed image URLs
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

    res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof Error) {
         res.status(400).json({ 
            error: error.message,
            details: error.toString()
        });
    }
    // Fallback for unknown error types
     res.status(500).json({ 
        error: 'An unexpected error occurred',
        details: JSON.stringify(error)
    });
  }
};

export const getProduct = async (req: Request, res: Response, _next: NextFunction) : Promise<void> => {
  try {
    const { name } = req.params;

    // Validate if name exists
    if (!name) {
      res.status(400).json({ error: 'Product name is required' });
    }

    const cachedProduct = await client.get(name as string);

    if (cachedProduct) {
      // If product is found in cache, return the cached product
      console.log('Redis Cache hit');
      res.status(200).json(JSON.parse(cachedProduct));
      return; 
    }
    else{
      console.log('Redis Cache miss');
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
      res.status(404).json({ error: 'Product not found' });
    }

    await client.set(name as string, JSON.stringify(product), { EX: 600 });  

    res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllProducts = async (_req: Request, res: Response, _next: NextFunction) : Promise<void> =>  {
  try {
    // Fetch all products with related data using include
    const products = await prisma.product.findMany({
      include: {
        images: true,
        pricing: true,
        makers: {
          include: {
            user: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'  // Optional: Order by creation date
      }
    });

    if (!products || products.length === 0) {
      res.status(404).json({ message: 'No products found' });
    }

    console.log(`Retrieved ${products.length} products`);

     res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
     res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const approveProduct = async (req: Request, res: Response, _next: NextFunction) : Promise<void> =>  {
  try {
    const { productId } = req.params;
    const { isApproved } = req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        isApproved
      },
      include: {
        images: true,
        pricing: true,
        makers: {
          include: {
            user: true
          }
        }
      }
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        user: true
      }
    });

    if (!product) {
       res.status(404).json({ error: 'Product not found' });
    }

    const subject = isApproved ? 'Your product has been approved' : 'Your product has been rejected';
    const body = isApproved ?
      `Congratulations, your product has been approved and is now live on our website! You can view it <a href="${process.env['REACT_APP_FRONTEND_URL']}/product/${product?.name}">here</a>.` :
      `Sorry to inform you that your product has been rejected. Please note that our moderators will get in touch with you to discuss further. If you have any questions, please reply to this email.`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env['EMAIL_USER'],
          pass: process.env['EMAIL_PASS'],
        }
      })

    await transporter.sendMail({
      from: process.env['EMAIL_USER'],
      to: product?.user.email,
      subject,
      html: body
    });

     res.status(200).json({
      success: true,
      data: updatedProduct
    });

  } catch (error) {
    console.error('Error approving/rejecting product:', error);
     res.status(500).json({
      success: false,
      message: 'Failed to update product status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getProductByCategory = async (req: Request, res: Response, _next: NextFunction) : Promise<void> =>  {
  try {
    const { categoryName } = req.params;

    console.log(categoryName);

    const products = await prisma.product.findMany({
      where: {
        category: categoryName
      },
      include: {
        images: true,
        pricing: true,
        makers: {
          include: {
            user: true
          }
        }
      }
    });

    if (!products || products.length === 0) {
       res.status(404).json({ message: 'No products found' });
    }

     res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error) {
    console.error('Error fetching products:', error);
     res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const upvoteProduct = async (req: Request, res: Response, _next: NextFunction) : Promise<void> =>  {
  try {
    const { productId } = req.params;

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        upvotes: {
          increment: 1
        }
      },
      include: {
        images: true,
        pricing: true,
        makers: {
          include: {
            user: true
          }
        }
      }
    });

     res.status(200).json({
      success: true,
      data: updatedProduct
    });

  } catch (error) {
    console.error('Error upvoting product:', error);
     res.status(500).json({
      success: false,
      message: 'Failed to upvote product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};