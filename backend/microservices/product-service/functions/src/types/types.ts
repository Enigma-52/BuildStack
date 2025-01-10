export interface ProductInput {
    name: string;
    tagline: string;
    description: string;
    websiteUrl?: string;
    category: string;
    videoUrl?: string;
    techStack: string[];
    targetAudience?: string;
    userId: string;
    pricing: {
      tiers: {
        tier: string;
        features: string[];
      }[];
    };
   }