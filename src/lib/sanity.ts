const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID // Örnek: abc123
const DATASET = 'production'
const API_VERSION = import.meta.env.SANITY_API_VERSION;// ya da latest

import { createClient } from '@sanity/client';
const client = createClient({
  projectId: PROJECT_ID, // Sanity projenizin ID'si
  dataset: 'production',       // Dataset adı
  useCdn: true,                // Caching için true
});
export async function fetchSanity(query: string, params: Record<string, any> = {}) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(
    query
  )}`

  const res = await fetch(url)

  if (!res.ok) {
    console.error(`Sanity API Error: ${res.status} ${res.statusText}`)
    throw new Error('Sanity API çağrısı başarısız oldu.')
  }
  
  const result = await res.json()

  return result.result

  
}
// Tüm postları al
export const getAllPosts = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, // Include _id for consistency
    slug, 
    title,
    publishedAt,
    featured, // Fetch the featured flag (ensure name matches your schema)
    body[]{ // Keep body for summary and potential reading time
      ...,
      _key,
      children[]{ 
        ...,
        _key, 
        text
      }
    },
    mainImage { 
      asset->{
        url
      }
    },
    categories[]->{ // Follow category references
      title,       // Get category title
      slug         // Get category slug
    }
  }`;
  const posts = await client.fetch(query);
  return posts;
};

// Slug'a göre tek bir post al
export const getSinglePost = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    body[]{
      ...,
      asset->{ // <<< Make sure this projection is here
        _id,
        url
      }
    },
    publishedAt,
    slug,
    mainImage {
      asset->{url}
    }
  }`;

  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
};