// src/types/sanity.ts

export type SanityCategory = {
  title: string;
  slug?: { current: string };
  // Add other category fields if needed
};

export type SanityPost = {
  _id: string;
  title?: string;
  slug?: { current: string };
  mainImage?: { asset?: { url?: string } };
  categories?: SanityCategory[];
  publishedAt?: string;
  body?: any; // Replace 'any' with a more specific Portable Text type if possible
  featured?: boolean;
  // Add other post fields if necessary
}; 