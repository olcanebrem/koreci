import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export async function getUsersFolderImages() {
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      prefix: 'users/', // Görsellerin bulunduğu klasör
      max_results: 50, // İhtiyacına göre artırılabilir
    });
    console.log('Cloudinary Response:', result);
    return result.resources || [];
  } catch (error) {
    console.error('Cloudinary API Hatası:', error);
    return [];
  }
}