import request from 'supertest';
import app from '../src/app'; 
import { it, describe, expect } from '@jest/globals';

describe('Health check request', () => {
  it('should return HTTP 200 OK for health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});

describe('Product API', () => {
  describe('Creating a Product', () => {
    it('should create a new product successfully', async () => {
      const productData = {
        category: "Productivity",
        description: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas",
        images: [
          "https://i.ibb.co/FhKGhK3/19f42f38169d.jpg"
        ],
        name: "test-product-" + Date.now(), // Making name unique
        pricing: {
          tiers: [
            {
              features: ["asd"],
              tier: "free"
            },
            {
              features: ["asd"],
              tier: "pro"
            }
          ]
        },
        tagline: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd",
        targetAudience: "asdasd",
        teamMembers: ["Arunabho Bhattacharya"],
        techStack: ["asdasd", "asdasd"],
        userId: "382fb6f9-6112-408d-9280-520eec29b785",
        videoUrl: "https://supabase.com/dashboard/project/vugswziuffddspozckgm/editor/29668?schema=public",
        websiteUrl: "https://supabase.com/dashboard/project/vugswziuffddspozckgm/editor/29668?schema=public"
      };

      const response = await request(app)
        .post('/api/products/createProduct')
        .send(productData)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(productData.name);
      expect(response.body.tagline).toBe(productData.tagline);
      expect(response.body.description).toBe(productData.description);
      expect(response.body.websiteUrl).toBe(productData.websiteUrl);
      expect(response.body.category).toBe(productData.category);
      expect(response.body.videoUrl).toBe(productData.videoUrl);
      expect(response.body.techStack).toEqual(productData.techStack);
      expect(response.body.targetAudience).toEqual(productData.targetAudience);
      expect(response.body.userId).toBe(productData.userId);
      expect(response.body.upvotes).toBe(0);
    });

    it('should return error for invalid product data', async () => {
      const invalidProductData = {
        // Missing required fields
        name: 'Test Product'
      };

      const response = await request(app)
        .post('/api/products/createProduct')
        .send(invalidProductData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});