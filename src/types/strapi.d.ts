// src/types/strapi.d.ts
export interface StrapiBlog {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    image?: {
      data?: {
        attributes?: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}