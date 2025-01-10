import { ProductInput } from "../types/types.js";
export const validateProductData = (data: ProductInput) => {
    const errors = [];
   
    // Required fields
    if (!data.name || data.name.length < 3) {
      errors.push('Name must be at least 3 characters');
    }
   
    if (!data.tagline || data.tagline.length < 5) {
      errors.push('Tagline must be at least 5 characters');
    }
   
    if (!data.description || data.description.length < 20) {
      errors.push('Description must be at least 20 characters');
    }
   
    if (!data.category) {
      errors.push('Category is required');
    }
   
    // Optional fields with format validation
    if (data.websiteUrl && !isValidUrl(data.websiteUrl)) {
      errors.push('Invalid website URL format');
    }
   
    if (data.videoUrl && !isValidUrl(data.videoUrl)) {
      errors.push('Invalid video URL format');
    }
   
    // Array validations
    if (!Array.isArray(data.techStack) || data.techStack.length === 0) {
      errors.push('At least one technology stack item is required');
    }
   
    // Pricing validation
    if (!data.pricing?.tiers || data.pricing.tiers.length !== 2) {
      errors.push('Both free and pro pricing tiers are required');
    }
   
    data.pricing?.tiers.forEach(tier => {
      if (!tier.features || tier.features.length === 0) {
        errors.push(`Features required for ${tier.tier} tier`);
      }
    });
   
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
   };

   const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
   };