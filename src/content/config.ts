import { defineCollection } from 'astro:content';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

export const collections = {
  resimler: defineCollection({
    loader: cldAssetsLoader({
      folder: 'draw', // Cloudinary'deki klasör adını buraya yaz
      limit: 100,
    }),
  }),
};

// Hata ayıklama için log ekle
console.log('Cloudinary Config:', {
  cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.CLOUDINARY_API_SECRET,
});