const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
  try {
    const result = await cloudinary.api.resources({ type: 'upload', tags: 'users' });
    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrls: result.resources.map(resource => resource.secure_url) }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }
};